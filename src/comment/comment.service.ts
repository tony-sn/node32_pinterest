import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, comment } from '@prisma/client';

@Injectable()
export class CommentService {
  // constructor(private readonly prisma: PrismaClient) { }
  prisma = new PrismaClient();

  // create(createCommentDto) {
  //   return 'This action adds a new comment';
  // }


  async findOne(id: number) {
    try {
      const commentData = await this.prisma.comment.findFirst({
        where: {
          image_id: id,
        },
      });
      return commentData;
    } catch {
      throw new Error(`404: Cannot find any comment`);
    }
  }

  async findAll(id: number) {
    try {
      const commentList = await this.prisma.comment.findMany({
        where: {
          image_id: id,
        },
      });

      return { success: true, data: commentList };
    } catch {
      return {
        success: false,
        message: '401: Cannot find any comment!',
      };
    }
  }

  // create a comment from user at an image
  async createComment(userComment) {
    try {
      const { userId, imageId, commentId, commentDate, content } = userComment;
      const user = await this.prisma.user.findFirst({
        where: {
          user_id: userId,
        },
      });
      if (!user) {
        return { success: false, message: '401: Cannot find user!' };
      }

      const image = await this.prisma.image.findFirst({
        where: {
          image_id: imageId,
        },
      });
      if (!image) {
        return { success: false, message: '404: Image not found!' };
      }

      const commentDateCreated = new Date(commentDate);
      const newComment = {
        comment_id: commentId,
        user_id: userId,
        image_id: imageId,
        comment_date: commentDateCreated,
        content,
      };
      const createdComment = await this.prisma.comment.create({
        data: newComment,
      });
      return {
        success: true,
        message: 'This is a create comment function',
        data: newComment,
      };
    } catch (err) {
      return { success: false, message: `401: Cannot create comment. ${err}` };

    }
  }
}
