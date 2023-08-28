import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ImageModule } from './image/image.module';
import { CommentModule } from './comment/comment.module';
import { SaveImageModule } from './save_image/save_image.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ImageModule,
    CommentModule,
    SaveImageModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
