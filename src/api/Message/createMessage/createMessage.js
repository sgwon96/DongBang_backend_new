import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

 export default {
   Mutation: {
    createMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
       const { roomId,toId,message } = args;
       let room;
       if (roomId === undefined) {
         if (user.id !== toId) {
           room = await prisma.room.create({
               data:{
                participants: {
                    connect: [{ id: toId }, { id: user.id }]
                  }
               }
             })
         }
       } else {
         room = await prisma.room.findUnique({where:{ id: roomId }});
       }
       if (room == null) {
         throw Error("Room not found");
       }
       const toUser = await prisma.user.findFirst({where:
        {AND:[{id  : {not:user.id}}, {rooms:{some:{id:room.id}}}]}
      });

       return prisma.message.create({
           data:{
            text: message,
            from: {
              connect: { id: user.id }
            },
            to: {
              connect: {
                id: toUser.id
              }
            },
            room: {
              connect: {
                id: room.id
              }
            }
          }
       });
     }
   }
 };