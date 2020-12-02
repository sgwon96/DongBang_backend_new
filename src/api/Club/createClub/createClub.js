import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createClub: async (_, args) => {
      const {
        clubName,
        clubBio,
        description,
        logoImage,
        clubImage,
        type,
        userId,
      } = args;
      const club = await prisma.club.create({
        data: {
          clubName,
          clubBio,
          description,
          type,
          logoImage,
          clubImage,
          master: {
            connect: {
              userId,
            },
          },
          members: {
            connect: [
              {
                userId,
              },
            ],
          },
        },
      });
      return club;
    },
  },
};