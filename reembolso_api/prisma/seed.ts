import { Category, PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('Teste123!', 8);

  // Preserve existing records so the seed can run repeatedly without data loss.
  await prisma.$transaction(async (tx) => {
    await tx.user.upsert({
      where: { email: 'gestor@example.com' },
      update: {},
      create: {
        name: 'Gestor de Exemplo',
        email: 'gestor@example.com',
        password,
        role: UserRole.manager,
      },
    });

    const employee = await tx.user.upsert({
      where: { email: 'funcionario@example.com' },
      update: {},
      create: {
        name: 'Funcionário de Exemplo',
        email: 'funcionario@example.com',
        password,
        role: UserRole.employee,
      },
    });

    const refunds = [
      { id: 'b4fae101-8fd0-4c84-a101-000000000001', name: 'Almoço em viagem', amount: 45.9, category: Category.food },
      { id: 'b4fae101-8fd0-4c84-a101-000000000002', name: 'Transporte para reunião', amount: 32.5, category: Category.transport },
      { id: 'b4fae101-8fd0-4c84-a101-000000000003', name: 'Hospedagem em viagem', amount: 280, category: Category.accommodation },
      { id: 'b4fae101-8fd0-4c84-a101-000000000004', name: 'Impressão de materiais', amount: 18, category: Category.services },
      { id: 'b4fae101-8fd0-4c84-a101-000000000005', name: 'Materiais de escritório', amount: 64.9, category: Category.others },
    ];

    for (const refund of refunds) {
      await tx.refunds.upsert({
        where: { id: refund.id },
        update: {},
        create: {
          ...refund,
          userId: employee.id,
          // Example only: no receipt file is created by this seed.
          filename: 'comprovante-exemplo.pdf',
        },
      });
    }
  });

  console.log('Seed concluída: 2 usuários de exemplo e 5 reembolsos disponíveis.');
}

main()
  .catch((error) => {
    console.error('Erro ao executar a seed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
