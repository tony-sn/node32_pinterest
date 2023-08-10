import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Get('/get-comment/:imageId')
  findCommentByImageId(@Param('imageId') imageId: string) {
    return this.commentService.findOne(+imageId);
  }

  // TODO: add route for get comment based on image id
  // POST request for post a new comment
  // DEL for delete a comment
}
