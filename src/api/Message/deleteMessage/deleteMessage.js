import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteMessage: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { user } = request;
        const { id } = args; 
        const message = await prisma.message.findUnique({where:{id:id}});

        if(message == null){
          throw Error("메세지가 존재하지 않습니다.");
        }

        if(user.id == message.fromId){
            return await prisma.message.delete({
                where: {
                  id: id,
                },
              });
        } else {
            throw Error("메세지 작성자가 아닙니다.");
        }
    },
  },
};