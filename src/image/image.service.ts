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
  }

  // find image info and user info based on image_id
  async findOne(id: number) {
    try {
      const data = await this.prisma.image.findFirst({
        where: {
          image_id: id,
        },
      });
      const { user_id } = data;
      const userInfo = await this.prisma.user.findFirst({
        where: {
          user_id,
        },
      });
      const imageData = {
        ...data,
        user: userInfo,
      };
      return imageData;
    } catch {
      throw new Error(`404: cannot find any image`);
    }
  }

  async findImageByName(imageName: string) {
    const data = await this.prisma.image.findMany({
      where: {
        image_name: {
          startsWith: imageName,
        },
      },
    });
    if (!data) return `404: cannot find any image with this name`;
    return data;
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
