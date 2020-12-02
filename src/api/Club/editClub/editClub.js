import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editClub: async (_, args) => {
      const {
        clubName,
        clubBio,
        description,
        logoImage,
        clubImage,
        type,
        userId,
        action,
      } = args;

      const club = prisma.club.findUnique({
        where: {
          clubId: userId,
        },
      });
      if (club) {
        if (action === EDIT) {
          return prisma.club.update({
            where: {
              clubId: userId,
            },
            data: {
              clubName,
              clubBio,
              description,
              logoImage,
              clubImage,
              type,
            },
          });
        } else if (action === DELETE) {
          return prisma.club.delete({
            where: {
              clubId: userId,
            },
          });
        }
      } else {
        throw Error("권한이 없습니다");
      }
    },
  },
};

// 지금은 테스트를 위해 userId를 입력받음. verify랑 user부분 구현 후, 추후 request에서 user추출한 뒤 userId로 club가져옴
