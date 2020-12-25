import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Mutation: {
    deleteMember: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { userId } = args;
      const { user } = request;
      const club = await prisma.club.findUnique({
        where: {
          masterId: user.userId, // 삭제하려는 유저가 클럽의 마스터이면 해당 club받아오기
        },
      });

      if (club) {
        await prisma.clubmember.delete({
          where: {
            _ClubMember_AB_unique: { A: club.clubId, B: userId },
          },
        });

        const deletedUser = await prisma.user.findUnique({
          where: {
            userId,
          },
        });
        return deletedUser;
      } else {
        throw Error("권한이 없습니다.");
      }
    },
  },
};
