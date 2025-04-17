import {
  Controller,
  Delete,
  HttpCode,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DeleteLinkService } from '../../../services/links/delete-link.service';
import { AuthGuard } from '../../../auth/jwt-auth.guard';
import { Request } from 'express';

type ParamType = {
  id: string;
};

@Controller('/links/:id')
@UseGuards(AuthGuard)
export class DeleteLinkController {
  constructor(private deleteLinkService: DeleteLinkService) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param()
    { id }: ParamType,
    @Req() req: Request,
  ) {
    let userId: string | undefined;
    if (req.user) {
      const { id } = req.user;
      userId = id;
    }
    await this.deleteLinkService.execute({ id, userId });
  }
}
