import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteChoice: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { clubId } = request.user;
        const { id } = args; 
        const choice = await prisma.choice.findUnique({where:{id:id}});
        const question =  await prisma.question.findUnique({where:{id:choice.questionId}});

        if(choice == null){
          throw Error("질문이 존재하지 않습니다.");
        }

        if(clubId == question.clubId){
            return await prisma.choice.delete({
                where: {
                  id: id,
                },
              });
        } else {
            throw Error("선택지 작성자가 아닙니다.");
        }
    },
  },
};