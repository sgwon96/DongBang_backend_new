import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteQuestion: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { clubId } = request.user;
        const { id } = args; 
        const question = await prisma.question.findUnique({
            where:{
                id:id
            }
        });

        if(question == null){
          throw Error("질문이 존재하지 않습니다.");
        }

        if(clubId == question.clubId){
            const question = await prisma.question.findUnique({where:{id:id}});
            await prisma.$queryRaw(`delete from question where id = ${id}`);
            return question;
        } else {
            throw Error("게시글 작성자가 아닙니다.");
        }
    },
  },
};