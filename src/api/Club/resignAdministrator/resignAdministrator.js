import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    resignAdministrator: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { clubId } = request.user;
        const { userId } = args;
        const user = await prisma.user.findUnique({where:{id:userId}});
        const administrator = await prisma.user.findFirst({where:{AND:[{adminClub:{some:{id:clubId}}},{id:userId}]}});

        if(clubId == null){
            throw Error("동아리 회장이 아닙니다.");
        }

        if(user == null){
            throw Error("사용자를 찾을 수 없습니다.");
        }
        
        if(administrator == null){
            throw Error("동아리 회원이 아닙니다.");
        } else {
            await prisma.user.update({where:{id:userId}, data:{adminClub:{disconnect:{id:clubId}}}});
            return user;
        }
    },
  },
};