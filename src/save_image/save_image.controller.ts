import { Controller, HttpCode, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SaveImageService } from './save_image.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('save-image')
@Controller('save-image')
export class SaveImageController {
  constructor(private readonly saveImageService: SaveImageService) { }
  @HttpCode(200)
  @Get('/check-saved-image/:userId')
  findSavedImage(@Param('userId') userId: string) {
    return this.saveImageService.findSavedImage(+userId);
  }
}
