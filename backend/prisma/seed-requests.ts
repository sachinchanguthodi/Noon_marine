import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding service requests...');

  // First, let's create services if they don't exist
  const services = [
    { name: 'Vessel Sales & Chartering', category: 'VESSEL_SALES' },
    { name: 'Marine Insurance', category: 'INSURANCE' },
    { name: 'Flag Registration', category: 'FLAG_REGISTRATION' },
    { name: 'Crew Management', category: 'VESSEL_MANAGEMENT' },
    { name: 'Repair & Docking', category: 'REPAIR_DOCKING' },
    { name: 'Spare Parts Supply', category: 'SPARE_PARTS' },
    { name: 'Logistics & Shipping', category: 'LOGISTICS' },
    { name: 'Training & Certification', category: 'TRAINING' },
  ];

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { name: service.name },
    });

    if (!existing) {
      await prisma.service.create({
        data: {
          name: service.name,
          category: service.category as any,
          description: `Professional ${service.name.toLowerCase()} services`,
          price: 1000,
          isActive: true,
        },
      });
    }
  }

  console.log('✅ Services created');

  // Create a test customer if doesn't exist
  const testUser = await prisma.user.findUnique({
    where: { email: 'john.doe@noonmarine.com' },
  });

  if (!testUser) {
    console.log('❌ Test user not found. Run the main seed first.');
    return;
  }

  // Create customer profile if doesn't exist
  let customer = await prisma.customer.findUnique({
    where: { userId: testUser.id },
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        userId: testUser.id,
        customerType: 'INDIVIDUAL',
        companyName: 'Maritime Solutions LLC',
        address: 'Dubai Marina',
        city: 'Dubai',
        country: 'UAE',
      },
    });
  }

  console.log('✅ Customer profile ready');

  // Create some test service requests
  const requestsData = [
    {
      serviceName: 'Marine Insurance',
      description: 'Need comprehensive hull and machinery insurance for MV OCEAN STAR. Vessel is 5 years old, 5000 DWT.',
      priority: 'HIGH',
      status: 'OPEN',
    },
    {
      serviceName: 'Flag Registration',
      description: 'Looking to register our new vessel under Liberia flag. All documentation is ready.',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
    },
    {
      serviceName: 'Crew Management',
      description: 'Need to recruit 2 experienced marine engineers and 1 captain for our offshore supply vessel.',
      priority: 'URGENT',
      status: 'OPEN',
    },
    {
      serviceName: 'Repair & Docking',
      description: 'Annual dry docking required for MV PACIFIC. Need to schedule in the next 3 months.',
      priority: 'MEDIUM',
      status: 'OPEN',
    },
    {
      serviceName: 'Training & Certification',
      description: 'STCW training needed for 10 crew members. Prefer in-person training in Dubai.',
      priority: 'LOW',
      status: 'CLOSED',
    },
    {
      serviceName: 'Spare Parts Supply',
      description: 'Urgent requirement for main engine spare parts. Need delivery within 2 weeks.',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
    },
  ];

  for (const reqData of requestsData) {
    const service = await prisma.service.findFirst({
      where: { name: reqData.serviceName },
    });

    if (service) {
      await prisma.serviceRequest.create({
        data: {
          customerId: customer.id,
          serviceId: service.id,
          description: reqData.description,
          priority: reqData.priority,
          status: reqData.status,
          ...(reqData.status === 'CLOSED' && { resolvedAt: new Date() }),
        },
      });
    }
  }

  console.log('✅ Service requests created');
  console.log('🎉 Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
