import { Injectable } from '@nestjs/common';
import { LinksRepository } from '../../database/contracts/contract-links-repository';

type Request = {
  id: string;
};

@Injectable()
export class DeleteLinkService {
  constructor(private linksRepository: LinksRepository) {}

  async execute({ id }: Request): Promise<void> {
    await this.linksRepository.delete(id);
  }
}
