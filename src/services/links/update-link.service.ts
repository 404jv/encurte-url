import { Injectable, NotFoundException } from '@nestjs/common';
import { LinksRepository } from '../../database/contracts/contract-links-repository';
import { LinkPresenter } from '../../http/presenters/link-presenter';

type Request = {
  url: string;
  id: string;
  userId: string;
};

@Injectable()
export class UpdateLinkService {
  constructor(private linksRepository: LinksRepository) {}

  async execute({ url, id }: Request): Promise<LinkPresenter> {
    // if (!this.isValidUrl(url)) {
    //   throw new BadRequestException('URL inválida');
    // }
    const linkExists = await this.linksRepository.findById(id);
    if (!linkExists) {
      throw new NotFoundException('Link not found.');
    }
    const link = await this.linksRepository.update({
      id,
      url,
    });
    const result = LinkPresenter.format(link);
    return result;
  }

  private isValidUrl(url: string): boolean {
    const regex =
      /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$/;
    return regex.test(url);
  }
}
