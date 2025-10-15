// Simple Prisma client for demo
export const prisma = {
  user: {
    findUnique: () => null,
    create: () => ({}),
  },
  order: {
    findMany: () => [],
    create: () => ({}),
  },
  product: {
    findUnique: () => null,
    update: () => ({}),
  },
  productVariant: {
    update: () => ({}),
  },
};