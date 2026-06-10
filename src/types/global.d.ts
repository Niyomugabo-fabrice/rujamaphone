import { PrismaClient } from "@prisma/client";

declare global {
  // prevent TS error + allow singleton
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export {};