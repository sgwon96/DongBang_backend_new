import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

 export default {
   Mutation: {
     updateUser: async (_, args, { request, isAuthenticated }) => {   
       const { id,name, studentNumber, phoneNumber, major, university } = args;
       const { user } = request;
       const targetUser = await prisma.user.findUnique({where:{id:id}});
       if(targetUser == null){
         throw Error("사용자가 존재하지 않습니다.");
       }
       if(user.id == id){
        return prisma.user.update({
          where: { id: user.id },
          data: { name, studentNumber, phoneNumber, major, university }
        });
       }else{
        throw Error("유저정보가 일치하지 않습니다.");
       }
       
     }
   }
 };