import { Link } from '@prisma/client';

type LinkPresenterResponse = {
  id: string;
  url: string;
  origin_url: string;
  total_clicks: number;
  created_at: Date;
  updated_at: Date;
};

export class LinkPresenter {
  static format(link: Link): LinkPresenterResponse {
    return {
      id: link.id,
      url: `http://localhost:3000/${link.id}`,
      origin_url: link.url,
      total_clicks: link.totalClicks,
      created_at: link.createdAt,
      updated_at: link.updatedAt,
    };
  }
}
