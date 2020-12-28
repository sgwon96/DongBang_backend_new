import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteClub: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { clubId } = request.user;
        if(clubId != null){
            await prisma.club.delete({
                where: {
                  id: clubId,
                },
              });
            return true;
        } else {
            return false;
        }
    },
  },
};