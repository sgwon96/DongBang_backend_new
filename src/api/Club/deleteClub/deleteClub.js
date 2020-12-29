import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteClub: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { clubId } = request.user;
        if(clubId != null){
            return await prisma.club.delete({
                where: {
                  id: clubId,
                },
              });
        } else {
           throw Error("동아리 회장이 아닙니다.");
        }
    },
  },
};