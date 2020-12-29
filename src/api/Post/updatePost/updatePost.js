import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

 export default {
   Mutation: {
     updatePost: async (_, args, { request, isAuthenticated }) => {
        const {
            id,
            title,
            content,
            fileUrl
          } = args;
       const { user } = request;
       const { clubId } = user;
       const post = await prisma.post.findUnique({
        where:{
            id:id
        }
        });
       if(post == null){
         throw Error("게시물이 존재하지 않습니다.");
       }

       if( clubId == post.authorId){
        return prisma.post.update({
            where: { id: id },
            data: { title,content,fileUrl }
          });
       }else{
         throw Error("게시글 작성자가 아닙니다.");
       }
     }
   }
 };