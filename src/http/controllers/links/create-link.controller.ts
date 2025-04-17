import { GetIdAuthGuard } from '../../../auth/get-id-auth.guard';
import { ApiError } from '../../../services/errors/api-error';
import { CreateLinkService } from '../../../services/users/create-link.service';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

type Body = {
  url: string;
};

@Controller('/links')
@UseGuards(GetIdAuthGuard)
export class CreateLinkController {
  constructor(private createLinkService: CreateLinkService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body()
    { url }: Body,
    @Req() req: Request,
  ) {
    let userId: string | undefined;
    if (req.user) {
      const { id } = req.user;
      userId = id;
    }
    if (!url) {
      throw new ApiError({
        message: 'All fields are required.',
        statusCode: 400,
      });
    }
    const link = await this.createLinkService.execute({ url, userId });
    return link;
  }
}
