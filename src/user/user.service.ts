import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async getUser(): Promise<user[]> {
    let data = await this.prisma.user.findMany();
    return data;
  }

  async getUserById(userId: number) {
    try {
      let data = await this.prisma.user.findFirst({
        where: { user_id: userId },
      });
      if (data) {
        return data;
      }
      return '404: User not found!';
    } catch {
      throw new HttpException('BE Error', 500);
    }
  }
}
