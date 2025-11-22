import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'sachinchandramohanan@gmail.com' },
  });

  if (user) {
    console.log('User found:', {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      status: user.status,
      role: user.role,
      createdAt: user.createdAt,
    });
  } else {
    console.log('User not found');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
