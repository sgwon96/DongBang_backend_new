import { PrismaClient } from "@prisma/client";
import { Connect } from "aws-sdk";

const prisma = new PrismaClient();

export default {
  Mutation: {
    createApplication: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { clubId, Answers }  = args;
      const clubExist = await prisma.club.findUnique({where:{id:clubId}});
      const applicationExist = await prisma.application.findFirst({where:{userId:user.id, clubId:clubId}});
      
      if(clubExist == null){
        throw Error(" 동아리가 존재하지 않습니다. ")
      } else if(applicationExist != null){
        throw Error(" 지원서가 이미 존재합니다. ")
      } else {
        const application = await prisma.application.create({
            data:{
                user: {connect:{id:user.id}},
                club: {connect:{id:clubId}},
            }
        });

        Answers.map(async (v) => {
          await prisma.answer.create({
            data:{
              type:v.type,
              answer:v.answer,
              index:v.index,
              application:{
                connect:{
                  id:application.id
                }
              }
            }
          });
        });

        return application;


      }
    },
  },
};