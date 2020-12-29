import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    readClub: async (_, args, { request, isAuthenticated }) => {
        const { id } = args;
        const club = await prisma.club.findUnique({
            where: { id: id }
        }  
        );
        if(club == null){
          throw Error("해당 동아리가 없습니다.")
        }else{
          return club;
        }
    },
  },
};