import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3002);

  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `🚀 Server running on http://localhost:${process.env.PORT ?? 3000}`,
  );

  // const logger = WinstonModule.createLogger({
  //   transports: [
  //     new winston.transports.Console(),
  //     new (winston.transports.DailyRotateFile)({
  //       filename: 'logs/application-%DATE%.log',
  //       datePattern: 'YYYY-MM-DD',
  //       maxFiles: '14d',
  //     }),
  //   ],
  // });

  // const app = await NestFactory.create(AppModule, { logger });
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // await app.listen(3000);
}
void bootstrap();
