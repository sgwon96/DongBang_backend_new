import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    leaveClub: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { clubId } = request.user;
        const { userId } = args;
        const user = await prisma.user.findUnique({where:{id:userId}});
        const member = await prisma.user.findFirst({where:{AND:[{joinClub:{some:{id:clubId}}},{id:userId}]}});

        if(clubId == null){
            throw Error("동아리 회장이 아닙니다.");
        }

        if(user == null){
            throw Error("사용자를 찾을 수 없습니다.");
        }
        
        if(member == null){
            throw Error("동아리 회원이 아닙니다.");
        } else {
            await prisma.user.update({where:{id:userId}, data:{joinClub:{disconnect:{id:clubId}}}});
            return user;
        }
    },
  },
};