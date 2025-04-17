import { Injectable, NotFoundException } from '@nestjs/common';
import { LinksRepository } from '../../database/contracts/contract-links-repository';
import {
  LinkPresenter,
  LinkPresenterResponse,
} from '../../http/presenters/link-presenter';

@Injectable()
export class GetLinkService {
  constructor(private linksRepository: LinksRepository) {}

  async execute(id: string): Promise<LinkPresenterResponse> {
    const link = await this.linksRepository.findById(id);
    if (!link || link.deletedAt !== null) {
      throw new NotFoundException('Link not found.');
    }
    await this.linksRepository.update({
      id: link.id,
      url: link.url,
      totalClicks: link.totalClicks + 1,
    });
    const result = LinkPresenter.format(link);
    return result;
  }
}
