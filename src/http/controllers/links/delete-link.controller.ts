import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { DeleteLinkService } from '../../../services/links/delete-link.service';

type ParamType = {
  id: string;
};

@Controller('/links/:id')
export class DeleteLinkController {
  constructor(private deleteLinkService: DeleteLinkService) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param()
    { id }: ParamType,
  ) {
    await this.deleteLinkService.execute({ id });
  }
}
