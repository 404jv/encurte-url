import { Link } from '@prisma/client';

export type LinkPresenterResponse = {
  id: string;
  url: string;
  origin_url: string;
  total_clicks: number;
  created_at: Date;
  updated_at: Date;
  user_id: string | null;
};

export class LinkPresenter {
  static format(link: Link): LinkPresenterResponse {
    const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';

    return {
      id: link.id,
      url: `${baseUrl}/${link.id}`,
      origin_url: link.url,
      total_clicks: link.totalClicks,
      user_id: link.userId,
      created_at: link.createdAt,
      updated_at: link.updatedAt,
    };
  }
}
