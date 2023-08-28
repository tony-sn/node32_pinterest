import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, user } from '@prisma/client';
import { userTypeDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor() { }
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

  async changeUser(user: userTypeDto, id: number) {
    try {
      const currentUser = this.prisma.user.findFirst({
        where: {
          user_id: Number(id),
        },
      });

      if (!currentUser) {
        return { success: false, message: '404: User not found!' };
      }

      const { user_id, email, full_name, age } = user;

      const updateUser: Prisma.userUpdateInput = {
        user_id: Number(user_id),
        email,
        age,
        full_name,
      };

      await this.prisma.user.update({
        where: {
          user_id: Number(updateUser.user_id),
        },
        data: updateUser,
      });
      const message = 'Update user successfully!';
      return {
        success: true,
        message,
        updateUser,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadAvatar(file: Express.Multer.File, userId: number) {
    try {
      // find user who wants to user avatar
      const getUserById = await this.prisma.user.findFirst({
        where: {
          user_id: userId,
        },
      });
      // find if user is found
      if (getUserById) {
        // get new avatar from upload file
        getUserById.avatar = file.filename;
        // update to db
        // {user_id, full_name, email,... }
        await this.prisma.user.update({
          data: getUserById,
          where: {
            user_id: userId,
          },
        });
        return {
          success: true,
          message: 'Update user successfully',
          data: getUserById,
        };
      }

      return {
        success: false,
        message: '404: User not found!',
      };
    } catch (err) {
      throw new HttpException('BE error', 500);
    }
  }
}
