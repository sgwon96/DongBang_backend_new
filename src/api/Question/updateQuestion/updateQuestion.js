import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

 export default {
   Mutation: {
     updateQuestion: async (_, args, { request, isAuthenticated }) => {
        const {
            id,
            index,
            title,
            type,
          } = args;
       const { user } = request;
       const { clubId } = user;
       const question = await prisma.question.findUnique({
        where:{
            id:id
        }
        });
       if(question == null){
         throw Error("질문이 존재하지 않습니다.");
       }

       if( clubId == question.clubId){
        return prisma.question.update({
            where: { id: id },
            data: { index,title,type }
          });
       }else{
         throw Error("질문 작성자가 아닙니다.");
       }
     }
   }
 };