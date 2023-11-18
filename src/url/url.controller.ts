import { Controller, Post, Body } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @UseInterceptors(SerializeInterceptor)
  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }
}
