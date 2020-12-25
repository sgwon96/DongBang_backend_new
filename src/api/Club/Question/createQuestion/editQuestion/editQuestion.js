import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editQuestion: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { questionId, content, action } = args;
      const question = await prisma.question.findUnique({
        where: {
          questionId,
        },
      });

      if (question) {
        if (action === EDIT) {
          return prisma.question.update({
            where: { questionId },
            data: {
              content,
            },
          });
        } else if (action === DELETE) {
          return prisma.question.delete({
            where: {
              questionId,
            },
          });
        } else {
          throw Error("질문을 받아오는데 실패했습니다.");
        }
      }
    },
  },
};
