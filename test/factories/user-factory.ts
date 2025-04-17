import { JwtService } from '@nestjs/jwt';
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

export async function createUserAndAuthenticate(prisma: PrismaService) {
  const user = await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      password: await hash('super123', 8),
      email: 'jhon@email.com',
    },
  });
  const jwt = new JwtService();
  const accessToken = await jwt.signAsync(
    {
      sub: user.id,
    },
    { secret: process.env.JWT_SECRET || 'secret' },
  );
  return {
    user,
    accessToken,
  };
}
