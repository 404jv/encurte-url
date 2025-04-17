import { BadRequestException, Injectable } from '@nestjs/common';
import { LinksRepository } from '../../database/contracts/contract-links-repository';
import { LinkPresenter } from '../../http/presenters/link-presenter';

type Request = {
  url: string;
  userId?: string;
};

@Injectable()
export class CreateLinkService {
  constructor(private linksRepository: LinksRepository) {}

  async execute({ url, userId }: Request): Promise<LinkPresenter> {
    if (!this.isValidUrl(url)) {
      throw new BadRequestException('URL inválida');
    }
    const id = this.generateRandomString(6);
    const link = await this.linksRepository.create({
      id,
      url,
      userId,
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

  private isValidUrl(url: string): boolean {
    const regex =
      /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$/;
    return regex.test(url);
  }
}
