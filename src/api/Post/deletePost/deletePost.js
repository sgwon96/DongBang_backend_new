import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    deletePost: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { clubId } = request.user;
        const { id } = args; 
        const post = await prisma.post.findUnique({
            where:{
                id:id
            }
        });
        if(clubId == post.authorId){
            await prisma.post.delete({
                where: {
                  id: id,
                },
              });
            return true;
        } else {
            return false;
        }
    },
  },
};