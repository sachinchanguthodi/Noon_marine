import { PrismaClient, UserRole, UserStatus, ServiceCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash password for test accounts
  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@noonmarine.com' },
    update: {},
    create: {
      email: 'admin@noonmarine.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+971501234567',
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: true,
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create John Doe Test Account
  const johnDoe = await prisma.user.upsert({
    where: { email: 'john.doe@noonmarine.com' },
    update: {},
    create: {
      email: 'john.doe@noonmarine.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+971501234567',
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
      emailVerified: true,
    },
  });

  console.log('✅ John Doe test account created:', johnDoe.email);

  // Create Test Customer User
  const customer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      email: 'customer@test.com',
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'Customer',
      phone: '+971507654321',
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
      emailVerified: true,
    },
  });

  console.log('✅ Test customer created:', customer.email);

  // Create Default Services (only if they don't exist)
  const services = [
    { name: 'Vessel Sales', category: ServiceCategory.VESSEL_SALES, description: 'Buy, sell vessels' },
    { name: 'Chartering', category: ServiceCategory.CHARTERING, description: 'Charter vessels' },
    { name: 'Marine Insurance', category: ServiceCategory.INSURANCE, description: 'Comprehensive marine coverage' },
    { name: 'Flag Registration', category: ServiceCategory.FLAG_REGISTRATION, description: 'International flag services' },
    { name: 'Vessel Management', category: ServiceCategory.VESSEL_MANAGEMENT, description: 'Vessel management services' },
    { name: 'Repair & Docking', category: ServiceCategory.REPAIR_DOCKING, description: 'Maintenance services' },
    { name: 'Spare Parts Supply', category: ServiceCategory.SPARE_PARTS, description: 'Marine parts delivery' },
    { name: 'Logistics', category: ServiceCategory.LOGISTICS, description: 'Cargo and equipment' },
    { name: 'Training & Certification', category: ServiceCategory.TRAINING, description: 'Professional courses' },
    { name: 'Classification', category: ServiceCategory.CLASSIFICATION, description: 'Class and survey booking' },
    { name: 'Offshore Support', category: ServiceCategory.OFFSHORE_SUPPORT, description: 'Engineering and logistics' },
    { name: 'Legal Consultancy', category: ServiceCategory.LEGAL, description: 'Maritime law services' },
    { name: 'Salvage & Towage', category: ServiceCategory.SALVAGE, description: 'Emergency services' },
  ];

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { name: service.name }
    });

    if (!existing) {
      await prisma.service.create({
        data: service,
      });
    }
  }

  console.log('✅ Default services created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
