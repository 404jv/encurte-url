import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import { ListLinksService } from '../../../services/links/list-links.service';
import { AuthGuard } from '../../../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('/links')
@UseGuards(AuthGuard)
export class ListLinksController {
  constructor(private listLinksService: ListLinksService) {}

  @Get()
  @HttpCode(200)
  async handle(@Req() req: Request) {
    let userId: string | undefined;
    if (req.user) {
      const { id } = req.user;
      userId = id;
    }
    return await this.listLinksService.execute(userId!);
  }
}
