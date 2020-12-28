import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    readAllClubs: async () => {
      return prisma.club.findMany();
    },
  },
};