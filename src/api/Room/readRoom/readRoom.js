import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
    Query: {
      readRoom: async (_, args, {request, isAuthenticated}) => {
        isAuthenticated(request);
        const {id} = args;
        const {user} = request;
        const room = await prisma.room.findUnique({where:{id:id}});
        if(room) {
          return room;
        }
        else {
          throw Error("room이 존재하지 않습니다.");
        }
      }
    }
  }