import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/usersService';
// import {ConfigModule, ConfigService} from "@nestjs/config"
// import { TypeOrmModule } from '@nestjs/typeorm';
// import {getTypeOrmConfig} from "./database/typeorm.config"
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      // username: 'myuser',
      // password: 'mypassword',
      // database: 'mydb',
       username: 'postgres',
      password: 'postgres',
      database: 'todo_db',
      autoLoadEntities: true,
      entities: [User], 
      synchronize: true, // ❗ only in dev, not in prod
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})



// @Module({
//   imports: [
//     ConfigModule.forRoot({isGlobal: true}),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory:(configService: ConfigService) => getTypeOrmConfig(configService),

//     })
//   ]
// })
export class AppModule {}
