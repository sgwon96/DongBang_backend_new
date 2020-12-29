import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteUser: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { user } = request;
        const { id } = args;
        if(id == user.id){
            return await prisma.user.delete({
                where: {
                  id: id,
                },
              });
        } else {
          throw Error("유저 정보가 일치하지 않습니다.");
        }
    },
  },
};