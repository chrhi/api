import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

async function bootstrap(): Promise<INestApplication> {
  if (!app) {
    app = await NestFactory.create(AppModule);
    await app.init();
  }
  return app;
}

export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  const httpAdapter = app.getHttpAdapter();
  return httpAdapter.getInstance()(req, res);
}
