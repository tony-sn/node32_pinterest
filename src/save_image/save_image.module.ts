import { Module } from '@nestjs/common';
import { SaveImageController } from './save_image.controller';
import { SaveImageService } from './save_image.service';

@Module({
  controllers: [SaveImageController],
  providers: [SaveImageService]
})
export class SaveImageModule {}
