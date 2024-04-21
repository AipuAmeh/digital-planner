import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { Todo } from './todo/entities/todo.entity';
import { User } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import typeorm from './config/typeorm';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => 
        configService.get('typeorm'),
    }),
    TypeOrmModule.forFeature([Todo, User]),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
  ],
  controllers: [TodoController, AuthController],
  providers: [TodoService, AuthService, MailService],
})
export class AppModule {}
