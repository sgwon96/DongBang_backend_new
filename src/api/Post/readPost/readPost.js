import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    readPost: async (_, args, { request, isAuthenticated }) => {
        const { id } = args;
        const post = await prisma.post.findUnique({
            where: { id: id }
        }  
        );
        if(post == null){
          throw Error("게시글이 존재하지 않습니다.");
        }else{
          return post;
        }
    },
  },
};