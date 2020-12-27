import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    seeAllQuestions: async () => {
      return prisma.question.findMany();
    },
  },
};
