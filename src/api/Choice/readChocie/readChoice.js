import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    readChoice: async (_, args, { request, isAuthenticated }) => {
        const { id } = args;
        const choice = await prisma.choice.findUnique({
            where: { id: id }
        }  
        );
        if(choice == null){
          throw Error("선택지가 존재하지 않습니다.");
        }else{
          return choice;
        }
    },
  },
};