import { PrismaService } from 'src/database/prisma/prisma.service';

type CreateLink = {
  prisma: PrismaService;
  url?: string;
  id?: string;
  userId?: string;
  totalClicks?: number;
  deletedAt?: Date | null;
};

export async function createLink({
  prisma,
  id,
  deletedAt,
  totalClicks,
  url,
  userId,
}: CreateLink) {
  return await prisma.link.create({
    data: {
      url: url || 'https://example.com',
      id: id || '123456',
      totalClicks: totalClicks || 0,
      userId: userId || null,
      deletedAt: deletedAt || null,
    },
  });
}
