import { PrismaClient } from "@prisma/client";
import { generateSecret, sendPasswordMail } from "../../../utils";
const prisma = new PrismaClient();

 export default {
   Mutation: {
     emailAuthenticateForPassword: async (_, args) => {
       const { email } = args;
       const existUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
      });
      if(existUser!=null){
        const secret = generateSecret();
        try {
            await sendPasswordMail(email, secret);
            return secret;
          } catch (error) {
            console.log(error);
          }
      }else {
          return "유저가 존재하지 않습니다."
      }
     }
   }
 };