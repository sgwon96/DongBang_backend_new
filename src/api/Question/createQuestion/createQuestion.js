import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createQuestion: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const id = user.clubId;
      const {
        title,
        type,
      } = args;
      
      if(id == null) {
        throw Error("클럽 마스터가 아닙니다.");
      }else {
        return prisma.question.create({
          data: {
              title,
              type,
              club : {
                  connect:{
                      id: id
                  }
              }
          },
        });
      } 
    },
  },
};