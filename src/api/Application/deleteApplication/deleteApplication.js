import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteApplication: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { user } = request;
        const { id } = args; 
        const application = await prisma.application.findUnique({where:{id:id}});

        if(application == null){
          throw Error("지원서가 존재하지 않습니다.");
        }

        if( user.id == application.userId){
            await prisma.$queryRaw(`delete from Application where id = ${id}`);
            return application;
        } else {
            throw Error("지원서 작성자가 아닙니다.");
        }
    },
  },
};