import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createQuestion: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const id = user.clubId;
      const {
        index,
        title,
        type,
      } = args;
      const question = await prisma.question.findFirst({where:{index:index}});
      
      if(id == null) {
        throw Error("클럽 마스터가 아닙니다.");
      }else if(question != null){
        throw Error("index가 중복되었습니다.")
      }else {
        return prisma.question.create({
          data: {
              index,
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