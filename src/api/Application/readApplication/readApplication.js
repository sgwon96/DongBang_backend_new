import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    readApplication: async (_, args, { request, isAuthenticated }) => {
        const { id } = args;
        const application = await prisma.application.findUnique({
            where: { id: id }
        }  
        );
        if(application == null){
          throw Error("지원서가 존재하지 않습니다.");
        }else{
          return application;
        }
    },
  },
};