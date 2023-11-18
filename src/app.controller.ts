import {
  Controller,
  Get,
  // InternalServerErrorException,
  Param,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UrlService } from './url/url.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly urlService: UrlService,
  ) {}

  @Get(':short_url')
  @Redirect()
  async redirectToLongUrl(
    @Param('short_url') short_url: string,
  ): Promise<{ url: string }> {
    // Fetch the long URL from the database based on the short URL
    const longUrl = await this.urlService.getLongUrl(short_url);
    return { url: longUrl };
  }
}
