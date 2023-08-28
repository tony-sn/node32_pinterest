import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CommentService } from './comment.service';
import { Comment as CommentDto } from './dto';

@ApiTags('comment')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Get('/get-comment/:imageId')
  findCommentByImageId(@Param('imageId') imageId: string) {
    return this.commentService.findOne(+imageId);
  }

  @Get('/get-comments/:imageId')
  findComments(@Param('imageId') imageId: string) {
    return this.commentService.findAll(+imageId);
  }

  @HttpCode(202)
  @Post('/')
  async createComment(@Body() body: CommentDto, @Headers('token') token) {
    return this.commentService.createComment(body);
  }

  // TODO: add route for get comment based on image id
  // POST request for post a new comment
  // DEL for delete a comment
}
