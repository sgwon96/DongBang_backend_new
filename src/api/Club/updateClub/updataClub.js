import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

 export default {
   Mutation: {
     updateClub: (_, args, { request, isAuthenticated }) => {
       const {
        name,
        type,
        description,
        content,
        clubImage,
        logoImage,
        partyDay,
        party,
        numberOfMembers,
        isUnion,
        email,
        phoneNumber
      } = args;
       const { user } = request;
       const { clubId } = user;
       if( clubId != null){
        return prisma.club.update({
            where: { id: clubId },
            data: { name, type, description, content, clubImage, logoImage, partyDay, party, numberOfMembers, isUnion, email, phoneNumber }
          });
       }else{
        throw Error("동아리 회장이 아닙니다.");
       }
     }
   }
 };