import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const SALTROUNDS = 10;
const prisma = new PrismaClient();

 export default {
   Mutation: {
     createUser: async (_, args) => {
       const { email, password, userName, university, major, userPhoneNumber, studentNumber} = args;
         const encryptedPassword = await bcrypt.hash(password,SALTROUNDS);
         const user = await prisma.user.create({
             data:{
                email,
                encryptedPassword,
                userName,
                university,
                major,
                userPhoneNumber,
                studentNumber
             }    
         });
         return user;
     }
   }
 };