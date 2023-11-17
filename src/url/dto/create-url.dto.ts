import { IsNotEmpty } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  long_url: string;
}
