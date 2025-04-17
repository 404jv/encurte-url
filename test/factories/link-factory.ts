import { PrismaService } from 'src/database/prisma/prisma.service';

type CreateLink = {
  prisma: PrismaService;
  url?: string;
  id?: string;
  userId?: string;
  totalClicks?: number;
  deletedAt?: Date | null;
};

type CreateManyLinks = {
  prisma: PrismaService;
  userId?: string;
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

export async function createManyLinks({ prisma, userId }: CreateManyLinks) {
  await prisma.link.createMany({
    data: [
      {
        url: 'https://example.com',
        id: '123456',
        totalClicks: 0,
        userId: userId || null,
        deletedAt: null,
      },
      {
        url: 'https://example2.com',
        id: '654321',
        totalClicks: 0,
        userId: userId || null,
        deletedAt: null,
      },
      {
        url: 'https://example3.com',
        id: '112345',
        totalClicks: 0,
        userId: userId || null,
        deletedAt: null,
      },
      {
        url: 'https://example4.com',
        id: '122345',
        totalClicks: 3,
        userId: userId || null,
        deletedAt: new Date(),
      },
    ],
  });
  return await prisma.link.findMany({
    where: {
      userId: userId || null,
      deletedAt: null,
    },
  });
}
