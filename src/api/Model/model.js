import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
   User: {
     clubMaster: (parent) => parent.clubId ? prisma.club.findUnique({where:{id:parent.clubId}}) : null,
     application: (parent) => prisma.application.findMany({where:{userId:parent.id}}),
     joinClub:  (parent) => prisma.club.findMany({where:{members:{some:{id:parent.id}}}}),
   },
   Club: {
    questions: (parent) => prisma.question.findMany({where:{clubId:parent.id},orderBy: {index: "asc"}}),
    posts: (parent) => prisma.post.findMany({where:{authorId:parent.id}}),
    applications: (parent) => prisma.application.findMany({where:{clubId:parent.id}}),
    members: (parent) => prisma.user.findMany({where:{joinClub:{some:{id:parent.id}}}}),
    master:   (parent) => prisma.user.findFirst({where:{clubId:parent.id}}),
   },
   Post: {
     author: (parent) => prisma.club.findUnique({where:{id:parent.authorId}}),
   },
   Question: {
    choices: (parent) => prisma.choice.findMany({where:{questionId:parent.id}}),
    club: (parent) => prisma.club.findUnique({where:{id:parent.clubId}}),
   },
   Choice: {
    question: (parent) => prisma.question.findUnique({where:{id:parent.questionId}})
   },
   Application: {
     club: (parent) => prisma.club.findUnique({where:{id:parent.clubId}}),
     answers: (parent) => prisma.answer.findMany({where:{applicationId:parent.id},orderBy: {index: "asc"}}),
     user: (parent) => prisma.user.findUnique({where:{id:parent.userId}}),
    },
    Answer: {
      application: (parent) => prisma.application.findUnique({where:{id:parent.applicationId}}),
    },
    Room: {
      participants: (parent) => prisma.user.findMany({where:{rooms:{some:{id:parent.id}}}},),
      messages: (parent) => prisma.message.findMany({where:{roomId:parent.id},orderBy: {createdAt: "asc"}}),
      recentMessage:  (parent) => prisma.message.findFirst({where:{roomId:parent.id},orderBy: {createdAt: "desc"}})
    },
    Message: {
      from: (parent) => prisma.user.findUnique({where:{id:parent.fromId}}),
      to: (parent) => prisma.user.findUnique({where:{id:parent.toId}}),
    }
   };
