import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(202)
  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  // NOTE: Upload an image
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + file.originalname),
      }),
    }),
  )
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(202)
  @Post('/upload-image')
  uploadImage(@UploadedFile() file) {
    return file;
  }

  @Get('/get-image')
  findAll() {
    return this.imageService.findAll();
  }

  // NOTE: get created images by user
  @Get('/get-image-by-user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.imageService.findAllByUser(+userId);
  }


  @Get('/get-image/:id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Get('/get-image-by-name/:imageName')
  findImageByName(@Param('imageName') imageName: string) {
    return this.imageService.findImageByName(imageName);
  }

  @Get('/check-saved-image/:userId')
  findSavedImage(@Param('userId') userId: string) {
    return this.imageService.findSavedImage(+userId);

  }

  // TODO: need more route
  // get-createdimage/{userId}
  // get-savedimage/{userId}
  // create-image
  // save-image
  // delete-image/{id}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Delete()
  remove(
    @Body() body: { userId: string; id: string },
    @Headers('token') token: string,
  ) {
    return this.imageService.remove(body);
  }
}
