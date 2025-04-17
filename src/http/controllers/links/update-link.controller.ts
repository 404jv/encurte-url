import {
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UpdateLinkService } from '../../../services/links/update-link.service';
import { ApiError } from '../../../services/errors/api-error';
import { AuthGuard } from '../../../auth/jwt-auth.guard';

type Body = {
  url: string;
};

type ParamType = {
  id: string;
};

@Controller('/links/:id')
@UseGuards(AuthGuard)
export class UpdateLinkController {
  constructor(private updateLinkService: UpdateLinkService) {}

  @Put()
  @HttpCode(201)
  handle(
    @Body()
    { url }: Body,
    @Req() req: Request,
    @Param() { id }: ParamType,
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
    return this.updateLinkService.execute({
      url,
      id,
      userId: userId!,
    });
  }
}
