import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { Todo } from './todo/entities/todo.entity';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

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
    TypeOrmModule.forFeature([Todo, User]),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
  ],
  controllers: [TodoController, AuthController],
  providers: [TodoService, AuthService],
})
export class AppModule {}
