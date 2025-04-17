import { Link } from '@prisma/client';

export type CreateLink = {
  url: string;
  id: string;
  userId?: string;
};

export type UpdateLink = {
  url: string;
  id: string;
};

export abstract class LinksRepository {
  abstract create: (data: CreateLink) => Promise<Link>;
  abstract update: (data: CreateLink) => Promise<Link>;
  abstract delete: (id: string) => Promise<void>;
  abstract findById: (id: string) => Promise<Link | null>;
  abstract findAllByUserId: (id: string) => Promise<Link[]>;
}
