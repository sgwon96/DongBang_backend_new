import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

 export default {
   Mutation: {
     updateUser: (_, args, { request, isAuthenticated }) => {   
       const { id,name, studentNumber, phoneNumber, major, university } = args;
       const { user } = request;
       if(user.id == id){
        return prisma.user.update({
          where: { userId: user.userId },
          data: { name, studentNumber, phoneNumber, major, university }
        });
       }else{
        throw Error("유저정보가 일치하지 않습니다.");
       }
       
     }
   }
 };