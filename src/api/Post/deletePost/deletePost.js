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

        if(post == null){
          throw Error("게시글이 존재하지 않습니다.");
        }

        if(clubId == post.authorId){
            return await prisma.post.delete({
                where: {
                  id: id,
                },
              });
        } else {
            throw Error("게시글 작성자가 아닙니다.");
        }
    },
  },
};