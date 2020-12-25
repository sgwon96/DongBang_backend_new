import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createClub: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userId = user.userId;
      const {
        clubName,
        clubBio,
        description,
        logoImage,
        clubImage,
        type,
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
        },
      });
      //Todo : 동아리 생성한 아이디가 clubmemeber로 추가되어야 함.
      return club;
    },
  },
};

// 동아리를 생성하는 사람이 초기에 master가 됨.
