import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const SALTROUNDS = 10;
const prisma = new PrismaClient();

 export default {
   Mutation: {
     createUser: async (_, args) => {
       const { email, password, auth} = args;
       if(auth){
         const encryptedPassword = await bcrypt.hash(password,SALTROUNDS);
         const user = await prisma.user.create({
             data:{
                email,
                encryptedPassword
             }    
         });
         return user;
       } else {
        throw Error();
       }
     }
   }
 };