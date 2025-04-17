import { hash } from 'bcryptjs';
import { PrismaService } from 'src/database/prisma/prisma.service';

export async function createUser(prisma: PrismaService) {
  return await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      password: await hash('super123', 8),
      email: 'jhon@email.com',
    },
  });
}
