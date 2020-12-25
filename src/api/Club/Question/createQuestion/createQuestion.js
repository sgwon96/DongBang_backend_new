import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createQuestion: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const club = await prisma.club.findUnique({
        where: {
          masterId: user.userId,
        },
      });
      const clubId = club.clubId;
      const { content, type } = args;
      const question = await prisma.question.create({
        data: {
          content,
          type,
          club: {
            connect: { clubId },
          },
        },
      });
      return question;
    },
  },
};
