import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    updateApplication: async (_, args, { request, isAuthenticated }) => {
        const { id,startTime,endTime,interviewDay } = args;
        const { user } = request;
        const application = await prisma.application.findUnique({
            where: { id: id }
        }  
        );
        if(application == null){
          throw Error("지원서가 존재하지 않습니다.");
        }
        if(application.clubId != user.clubId){
            throw Error("해당 동아리에 대한 지원서가 아닙니다.")
        }

        return prisma.application.update({where:{id:application.id},data:{startTime,endTime,interviewDay}});
    },
  },
};