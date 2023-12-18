import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // -- Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Gulu Bible Community Church')
    .setDescription('Backend API')
    .setVersion('1.0.0')
    .addBearerAuth() // The API will use Bearer Authentication
    .addBasicAuth({ type: 'apiKey', name: 'accessToken', in: 'query' }) // The API will use basic authentication for admin access
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
