import { Injectable } from '@nestjs/common';
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
    const createUrlObject = { ...createUrlDto, short_url, hash };
    return this.urlRepository.save(this.urlRepository.create(createUrlObject));
  }

  findOne(id: string) {
    return `This action returns a #${id} url`;
  }
}
