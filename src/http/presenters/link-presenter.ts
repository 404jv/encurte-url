import { Link } from '@prisma/client';

type LinkPresenterResponse = {
  id: string;
  url: string;
  created_at: Date;
  updated_at: Date;
};

export class LinkPresenter {
  static format(link: Link): LinkPresenterResponse {
    return {
      id: `http://localhost:3000/${link.id}`,
      url: link.url,
      created_at: link.createdAt,
      updated_at: link.updatedAt,
    };
  }
}
