import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const SALTROUNDS = 10;
const prisma = new PrismaClient();

 export default {
   Mutation: {
     createUser: async (_, args) => {
       const { email, password, name, university, major, phoneNumber, studentNumber} = args;
         const encryptedPassword = await bcrypt.hash(password,SALTROUNDS);
         const user = await prisma.user.create({
             data:{
                email,
                encryptedPassword,
                name,
                university,
                major,
                phoneNumber,
                studentNumber
             }    
         });
         return user;
     }
   }
 };