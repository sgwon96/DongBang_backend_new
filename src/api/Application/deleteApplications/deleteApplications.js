import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteApplications: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { user } = request;
        const { id } = args; 

        if(user.clubId == null){
            throw Error("로그인 된 사용자는 동아리 회장이 아닙니다.");
        }
        
        try {
            
        } catch (error) {
            
        }
        const returnValue = id.map(async (v) => {
        const application = await prisma.application.findUnique({where:{id:v}});
        if(application == null){
          return null;
        }
        if( user.clubId == application.clubId){
            await prisma.$queryRaw(`delete from Application where id = ${v}`);
            return v;
        } else {
            return null;
        }
          });
        
        return returnValue;
        
    },
  },
};