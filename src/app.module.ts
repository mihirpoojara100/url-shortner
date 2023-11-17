import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';
import { DataSource } from 'typeorm';
import { Url } from './url/entities/url.entity';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Admin@123',
      database: 'url-shortner',
      entities: [Url],
      synchronize: true,
    }),
    UrlModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
