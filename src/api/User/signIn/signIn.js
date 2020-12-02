import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { generateToken } from "../../../utils";

const SALTROUNDS = 10;
const prisma = new PrismaClient();

 export default {
   Mutation: {
     signIn: async (_, args) => {
       const { email, password } = args;
       const user = await prisma.user.findUnique({
            email 
        });
       const passwordTrue = bcrypt.compare(password, user.encryptedPassword)
       if (passwordTrue) {
         return generateToken(user.id);
       } else {
         throw Error("Wrong email/secret combination");
       }
     }
   }
 };