import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
// import {ConfigModule, ConfigService} from "@nestjs/config"
// import { TypeOrmModule } from '@nestjs/typeorm';
// import {getTypeOrmConfig} from "./database/typeorm.config"
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUp } from './auth/auth.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';
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
      entities: [SignUp, Todo],
      synchronize: true, // ❗ only in dev, not in prod
    }),
    AuthModule,
    UsersModule,
    TodoModule,
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
