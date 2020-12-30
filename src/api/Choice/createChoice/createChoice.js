import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createChoice: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const id = user.clubId;
      const {
        questionId,
        subject
      } = args;

      const question = await prisma.question.findUnique({
          where:{
              id:questionId
          }
      });
      
      if(id == null) {
        throw Error("클럽 마스터가 아닙니다.");
      }else if(question==null){
        throw Error("질문이 없습니다.");
      }else{
        return prisma.choice.create({
            data: {
                subject,
                checked:false,
                question : {
                    connect:{
                        id: questionId
                    }
                }
            },
          });
      }
    },
  },
};