import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('StrongAdminPassword123', 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        fullName: 'Super Admin',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin created successfully');
  } else {
    console.log('ℹ️ Admin already exists');
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
