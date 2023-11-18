import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UrlDto } from 'src/url/dto/url.dto';
export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        data.short_url = `http://localhost:5000/${data?.short_url}`;

        return plainToClass(UrlDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
