import { ApiError } from '../../../services/errors/api-error';
import { CreateLinkService } from '../../../services/users/create-link.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

type Body = {
  url: string;
};

@Controller('/links')
export class CreateLinkController {
  constructor(private createLinkService: CreateLinkService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body()
    { url }: Body,
  ) {
    if (!url) {
      throw new ApiError({
        message: 'All fields are required.',
        statusCode: 400,
      });
    }
    const link = await this.createLinkService.execute({ url });
    return link;
  }
}
