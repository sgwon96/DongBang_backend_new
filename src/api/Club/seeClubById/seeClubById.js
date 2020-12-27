import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    seeClubById: async (_, arg) => {
      const { clubId } = arg;
      console.log(clubId);
      return prisma.club.findUnique({
        where: {
          clubId,
        },
      });
    },
  },
};
