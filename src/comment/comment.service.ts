import { Injectable } from '@nestjs/common';
import { PrismaClient, comment } from '@prisma/client';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();

  create(createCommentDto) {
    return 'This action adds a new comment';
  }

  async findOne(id: number) {
    try {
      const commentData = await this.prisma.comment.findFirst({
        where: {
          image_id: id,
        },
      });
      return commentData;
    } catch {
      throw new Error(`404: cannot find any comment`);
    }
  }
}
