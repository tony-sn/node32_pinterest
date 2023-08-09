import { Injectable } from '@nestjs/common';
import { PrismaClient, image } from '@prisma/client';

import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageService {
  prisma = new PrismaClient();

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  async findAll(): Promise<image[]> {
    const data = await this.prisma.image.findMany();
    return data;

    // return `This action returns all image`;
  }

  async findOne(id: number) {
    const data = await this.prisma.image.findFirst({
      where: {
        image_id: id,
      },
    });
    console.log('image return', { data });
    return data;
    // return `This action returns a #${id} image`;
  }

  findSavedImage(id: number) {
    return `This action returns a #${id} saved image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
