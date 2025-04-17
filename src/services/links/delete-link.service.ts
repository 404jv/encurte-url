import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LinksRepository } from '../../database/contracts/contract-links-repository';

type Request = {
  id: string;
  userId?: string;
};

@Injectable()
export class DeleteLinkService {
  constructor(private linksRepository: LinksRepository) {}

  async execute({ id, userId }: Request): Promise<void> {
    const link = await this.linksRepository.findById(id);
    if (link && link.userId !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to delete this link.',
      );
    }
    await this.linksRepository.delete(id);
  }
}
