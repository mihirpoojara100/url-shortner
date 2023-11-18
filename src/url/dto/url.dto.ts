import { Expose } from 'class-transformer';

export class UrlDto {
  @Expose()
  short_url: string;
}
