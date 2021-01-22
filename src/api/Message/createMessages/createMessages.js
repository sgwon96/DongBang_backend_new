import { PrismaClient } from "@prisma/client";
import {CHANNEL_NEW_MESSAGE} from "../../../constant";

const prisma = new PrismaClient();

 export default {
   Mutation: {
    createMessages: async (_, args, { request, isAuthenticated, pubsub }) => {
      isAuthenticated(request);
        const { user } = request;
        const { toIds,text } = args;
        const messages = await toIds.map(async (toId) => {
        const existUser = await prisma.user.findUnique({where:{id:toId}});
        if(existUser == null){
            return null;
        }
        
        let room = await prisma.room.findFirst({where:{AND:[{participants:{some:{id:user.id}}},{participants:{some:{id:toId}}}]}});
        if (room === null) {
         if (user.id !== toId) {
           room = await prisma.room.create({
               data:{
                participants: {
                    connect: [{ id: toId }, { id: user.id }]
                  }
               }
             })
         }
       } 
       const message = await prisma.message.create({
           data:{
            text: text,
            from: {
              connect: { id: user.id }
            },
            to: {
              connect: {
                id: toId
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

      return message
    })
      return messages;
     }
   }
 };