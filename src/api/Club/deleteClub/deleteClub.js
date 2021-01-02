import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteClub: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { clubId } = request.user;
        if(clubId != null){
            const club = await prisma.club.findUnique({where:{id:clubId}});
            await prisma.$queryRaw(`delete from Club where id = ${clubId}`);
            return club;
        } else {
           throw Error("동아리 회장이 아닙니다.");
        }
    },
  },
};