import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { Repository } from 'typeorm';
import Helper from '../helpers/common.helper';
@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  async create(createUrlDto: CreateUrlDto) {
    const [short_url, hash] = new Helper().getSmallUrlAndHash(
      createUrlDto.long_url,
    );

    const sameUrlExist = await this.urlRepository.findOne({
      where: {
        hash,
      },
    });

    if (sameUrlExist) {
      return sameUrlExist;
    }

    const createUrlObject = { ...createUrlDto, short_url, hash };
    // change this to findOrCreate Method
    return this.urlRepository.save(this.urlRepository.create(createUrlObject));
  }

  async getLongUrl(short_url: string): Promise<string> {
    try {
      const urlEntity = await this.urlRepository.findOne({
        where: {
          short_url,
        },
      });

      if (!urlEntity) {
        throw new NotFoundException('Short URL not found');
      }

      return urlEntity.long_url;
    } catch (error) {
      // Handle database query error
      throw new InternalServerErrorException('Error fetching long URL');
    }
  }
}
