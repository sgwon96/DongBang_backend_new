import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

 export default {
   Mutation: {
     editUser: (_, args, { request, isAuthenticated }) => {
       isAuthenticated(request);
       const { name, studentNumber, phoneNumber, major, university } = args;
       const { user } = request;
       return prisma.user.update({
         where: { userId: user.userId },
         data: { name, studentNumber, phoneNumber, major, university }
       });
     }
   }
 };