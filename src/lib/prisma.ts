import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is missing.");
  }

  // 1. Establish a native Node-Postgres connection pool
  const pool = new Pool({ connectionString });
  
  // 2. Instantiate the Prisma 7 driver adapter wrapper
  const adapter = new PrismaPg(pool);
  
  // 3. Pass the adapter directly into the client constructor
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;