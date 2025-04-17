import { Link } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  CreateLink,
  LinksRepository,
} from '../contracts/contract-links-repository';

@Injectable()
export class PrismaLinksRepository implements LinksRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateLink): Promise<Link> {
    return this.prismaService.link.create({
      data: {
        url: data.url,
        id: data.id,
        userId: data.userId,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.link.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string): Promise<Link | null> {
    return this.prismaService.link.findUnique({
      where: {
        id,
      },
    });
  }
}
