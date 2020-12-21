import { PrismaClient } from "@prisma/client";
import { generateSecret, sendSecretMail } from "../../../utils";
const prisma = new PrismaClient();

 export default {
   Mutation: {
     emailAuthenticate: async (_, args) => {
       const { email } = args;
       const existUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
      });
      if(existUser==null){
        const secret = generateSecret();
        try {
            await sendSecretMail(email, secret);
            return secret;
          } catch (error) {
            console.log(error);
          }
      }else {
          return "overlap"
      }
     }
   }
 };