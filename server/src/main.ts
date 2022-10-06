// import { config } from 'dotenv';
// config()
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api')
  app.enableCors(
    {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  );
  await app.listen(process.env.APP_PORT || 5001, () =>
    console.log(`Start app on ${process.env.APP_PORT || 5001}`),
  )
}
bootstrap()
