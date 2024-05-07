import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerFactory } from './common/logger/logger-factory';

async function start() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: LoggerFactory('furniture'),
    });
    const PORT = process.env.PORT || 3001;
    app.setGlobalPrefix('api');
    const config = new DocumentBuilder()
      .setTitle('Furniture')
      .setDescription('About Furniture')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      console.log(`http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
