import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    updateChoice: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { clubId } = request.user;
        const { id,subject,checked } = args; 
        const choice = await prisma.choice.findUnique({where:{id:id}});
        const question =  await prisma.question.findUnique({where:{id:choice.questionId}});

        if(choice == null){
          throw Error("선택지가 존재하지 않습니다.");
        }

        if(clubId == question.clubId){
            return await prisma.choice.update({
                where: { id: id },
                data: { subject, checked }
              });
        } else {
            throw Error("선택지 작성자가 아닙니다.");
        }
    },
  },
};