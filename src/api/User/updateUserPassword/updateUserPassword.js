import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

const SALTROUNDS = 10;

 export default {
   Mutation: {
     updateUserPassword: async (_, args, { request, isAuthenticated }) => {   
       const { email,password } = args;
       const encryptedPassword = await bcrypt.hash(password,SALTROUNDS);
       const  user  = await prisma.user.findUnique({where:{email:email}});
       if(user == null){
         throw Error("사용자가 존재하지 않습니다.");
       }else{
        return prisma.user.update({
          where: { id: user.id },
          data: { encryptedPassword }
        });
       }
       
     }
   }
 };