import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    seeAllClubs: async () => {
      return prisma.club.findMany();
    },
  },
};