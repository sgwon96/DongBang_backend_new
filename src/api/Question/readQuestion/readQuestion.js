import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    readQuestion: async (_, args, { request, isAuthenticated }) => {
        const { id } = args;
        const question = await prisma.question.findUnique({
            where: { id: id }
        }  
        );
        if(question == null){
          throw Error("질문이 존재하지 않습니다.");
        }else{
          return question;
        }
    },
  },
};