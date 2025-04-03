import { Injectable } from '@nestjs/common';
import { LinksRepository } from '../../database/contracts/contract-links-repository';
import { LinkPresenter } from '../../http/presenters/link-presenter';

@Injectable()
export class CreateLinkService {
  constructor(private linksRepository: LinksRepository) {}

  async execute({ url }: any): Promise<LinkPresenter> {
    const id = this.generateRandomString(6);
    const link = await this.linksRepository.create({
      id,
      url,
    });
    const result = LinkPresenter.format(link);
    return result;
  }

  private generateRandomString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
}
