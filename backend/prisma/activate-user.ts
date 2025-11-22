import { PrismaClient, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.update({
    where: { email: 'sachinchandramohanan@gmail.com' },
    data: { status: UserStatus.ACTIVE },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      status: true,
      role: true,
    },
  });

  console.log('✅ User activated:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
