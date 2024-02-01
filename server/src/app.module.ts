import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { Todo } from './todo/entities/todo.entity';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [Todo, User],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Todo]),
    ConfigModule.forRoot(),
    UserModule,
  ],
  controllers: [TodoController, UserController],
  providers: [TodoService, UserService],
})
export class AppModule {}
