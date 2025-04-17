import { Controller, Get, HttpCode, Param, Res } from '@nestjs/common';
import { GetLinkService } from '../../../services/links/get-link.service';
import { Response } from 'express';

type ParamType = {
  id: string;
};

@Controller('/:id')
export class GetLinkController {
  constructor(private getLinkService: GetLinkService) {}

  @Get()
  @HttpCode(200)
  async handle(@Param() { id }: ParamType, @Res() res: Response) {
    const link = await this.getLinkService.execute(id);
    return res.redirect(link.url);
  }
}
