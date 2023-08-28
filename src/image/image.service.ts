import { Injectable, Param } from '@nestjs/common';

import { PrismaClient, image } from '@prisma/client';

import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImageService {
  prisma = new PrismaClient();

  async create(createImageDto: CreateImageDto) {
    const { image_id, user_id, image_name, url, description } = createImageDto;

    const file = await console.log('create image success', {});

    return 'This action adds a new image';
  }

  async findAll(): Promise<image[]> {
    const data = await this.prisma.image.findMany();
    return data;
  }

  async findAllByUser(id: number) {
    try {
      const data = await this.prisma.image.findMany({
        where: {
          user_id: id,
        },
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, message: `401: Cannot find image list!` };
    }
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

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  async remove(userDelete: { userId: string }, id: number) {
    const { userId } = userDelete;
    try {
      const user = await this.prisma.image.findFirst({
        where: {
          user_id: Number(userId),
        },
      });
      if (!user) {
        return {
          success: false,
          message: `404: Cannot find user!`,
        };
      }
      const data = await this.prisma.image.findFirst({
        where: {
          image_id: Number(id),
        },
      });
      if (!data) {
        return {
          success: false,
          message: `404: Cannot find the image!`,
        };
      }

      const deleteImage = await this.prisma.image.delete({
        where: {
          image_id: Number(id),
        },
      });
      return { success: true, message: 'Image deleted!', deleteImage };
    } catch (err) {
      return { success: false, message: `404: ` };
    }
  }
}
