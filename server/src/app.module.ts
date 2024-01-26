import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TodoModule } from './todo/todo.module';
import 'dotenv/config';
import { Todo } from './todo/entities/todo.entity';
import { ConfigModule } from '@nestjs/config';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [Todo],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Todo]),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
