import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createClub: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const isMaster = user.clubId;
      if(isMaster != null){
        throw Error("이 유저는 이미 동아리 회장 입니다.");
      }

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
      
      const club = await prisma.club.create({
        data: {
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
        },
      });

      const clubId = club.id
      await prisma.user.update({
        where:{
            id:user.id
        },
        data:{
            clubMaster:{
              connect: {
                id:clubId
              },
            },
        }
    })
      return club;
    },
  },
};