import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';

const port = process.env.PORT || 4000;

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(port);
  console.log(`Server started on ${port} port`);
};

bootstrap();
