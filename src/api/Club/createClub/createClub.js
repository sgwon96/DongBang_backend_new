import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createClub: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const id = user.id;
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
            id:id
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