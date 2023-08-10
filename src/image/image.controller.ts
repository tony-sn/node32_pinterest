import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @Get('/get-image')
  findAll() {
    return this.imageService.findAll();
  }

  @Get('/get-image/:id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Get('/get-image-by-name/:imageName')
  findImageByName(@Param('imageName') imageName: string) {
    return this.imageService.findImageByName(imageName);
  }

  @Get('/check-savedimage/:id')
  findSavedImage(@Param('id') id: string) {
    return this.imageService.findSavedImage(+id);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
