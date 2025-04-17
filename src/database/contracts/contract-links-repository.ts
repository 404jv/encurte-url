import { Link } from '@prisma/client';

export type CreateLink = {
  url: string;
  id: string;
  userId?: string;
};

export abstract class LinksRepository {
  abstract create: (data: CreateLink) => Promise<Link>;
}
