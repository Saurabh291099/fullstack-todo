// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { ConfigService } from '@nestjs/config';
// import { User } from '../users/user.entity';

// export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
//   type: 'postgres',
//   host: configService.get('POSTGRES_HOST'),
//   port: +configService.get<number>('POSTGRES_PORT'),
//   username: configService.get('POSTGRES_USER'),
//   password: configService.get('POSTGRES_PASSWORD'),
//   database: configService.get('POSTGRES_DB'),
//   entities: [User],
//   migrations: ['dist/migrations/*.js'],
//   synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
//   logging: true,
// });
