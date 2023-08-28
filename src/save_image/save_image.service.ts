import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SaveImageService {
  prisma = new PrismaClient();

  async findSavedImage(id: number) {
    try {
      const data = await this.prisma.save_image.findMany({
        where: {
          user_id: id,
        },
      });

      return { success: true, data };
    } catch (err) {
      return {
        success: false,
        message: `404: cannot find any saved image. ${err}`,
      };
    }
  }
}
