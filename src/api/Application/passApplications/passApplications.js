import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    passApplications: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { clubId } = request.user;
        const { applicationIds } = args;
        if(clubId == null){
            throw Error("동아리 회장이 아닙니다.");
        }
        const returnValue = applicationIds.map(async (applicationId) => {
            const application = await prisma.application.findUnique({where:{id:applicationId}});

            if(application == null){
                return null;
              }

            const userId = application.userId;
            const user = await prisma.user.findUnique({where:{id:userId}});
            
            if(application.clubId != clubId){
                return null;
            }
            
            if(user == null){
                return null
            } else {
                await prisma.user.update({where:{id:userId}, data:{joinClub:{connect:{id:clubId}}}});
                return applicationId;
            }
            
              });
            
            return returnValue;
    },
  },
};