import { Injectable } from '@nestjs/common';
import { LinksRepository } from '../../database/contracts/contract-links-repository';
import { LinkPresenter } from '../../http/presenters/link-presenter';

@Injectable()
export class ListLinksService {
  constructor(private linksRepository: LinksRepository) {}

  async execute(userId: string): Promise<LinkPresenter[]> {
    const links = await this.linksRepository.findAllByUserId(userId);
    const linksPresenter = links.map((link) => {
      return LinkPresenter.format(link);
    });
    return linksPresenter;
  }
}
