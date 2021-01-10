import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    appointMaster: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { user } = request;
        const { userId } = args;
        let targetUser = await prisma.user.findUnique({where:{id:userId}});

        if(targetUser == null){
            throw Error("사용자가 없습니다.")
        }

        if(user.clubId == null){
            throw Error("로그인된 사용자는 클럽 마스터가 아닙니다.")
        }

        if(targetUser.clubId != null){
            throw Error("대상유저는 이미 클럽 마스터입니다.")
        }

        targetUser = await prisma.user.findUnique({where:{id:userId}});
        await prisma.club.update({where:{id:user.clubId},data:{master:{connect:{id:userId}}}});
        return prisma.user.findUnique({where:{id:userId}});


        }
    }
};