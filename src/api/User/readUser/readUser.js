import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    readUser: async (_, args, { request, isAuthenticated }) => {
        const { id } = args;
        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        if(user != null){
          return user;
        }else{
          throw Error("일치하는 유저가 없습니다.");
        }
    },
  },
};