import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    Query: {
      readRoomByClubId: async (_, args, {request, isAuthenticated}) => {
        isAuthenticated(request);
        const {clubId} = args;
        const {user} = request;
        const clubMaster = await prisma.user.findFirst({where:{clubId:clubId}});

        if(clubMaster == null){
            throw Error("해당 동아리는 마스터가 없습니다.")
        }
        if(clubId == user.clubId){
            throw Error("로그인 된 유저는 해당 동아리의 마스터입니다.")
        }
        const room = await prisma.room.findFirst({where:{AND:[{participants:{some:{id:user.id}}},{participants:{some:{id:clubMaster.id}}}]}});
        console.log(room);
        if(room) {
          return room;
        }
        else {
          throw Error("room이 존재하지 않습니다.");
        }
      }
    }
  }