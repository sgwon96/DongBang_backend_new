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
    console.log(club);

      return post;
    },
  },
};