import { PrismaClient } from "@prisma/client";
import {CHANNEL_NEW_MESSAGE} from "../../../constant";

const prisma = new PrismaClient();

 export default {
   Mutation: {
    createMessage: async (_, args, { request, isAuthenticated, pubsub }) => {
      isAuthenticated(request);
      const { user } = request;
       const { roomId,toId,text } = args;
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

       const message = await prisma.message.create({
           data:{
            text: text,
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

       pubsub.publish(CHANNEL_NEW_MESSAGE, {
        newMessage: message,
        roomId: room.id
      });

      return message;
     }
   }
 };