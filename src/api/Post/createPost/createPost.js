import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const id = user.clubId;
      const {
        title,
        content,
        fileUrl
      } = args;
      
      if(id != null) {
        const post = await prisma.post.create({
          data: {
              title,
              content,
              fileUrl,
          },
        });
  
        const club = await prisma.club.update({
          where:{
              id:id
          },
          data:{
            posts:{
                connect:{
                    id:post.id
                }
            }  
          }
      });

      return post;

      } else {
        throw Error("클럽 마스터가 아닙니다.");
      }
    },
  },
};