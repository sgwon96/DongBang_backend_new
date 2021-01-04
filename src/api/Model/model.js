import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
   User: {
     clubMaster: (parent) => prisma.club.findUnique({where:{id:parent.clubId}}),
     application: (parent) => prisma.application.findMany({where:{userId:parent.id}}),
   },
   Club: {
    questions: (parent) => prisma.question.findMany({where:{clubId:parent.id}}),
    posts: (parent) => prisma.post.findMany({where:{authorrId:parent.id}}),
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
     answers: (parent) => prisma.answer.findMany({where:{applicationId:parent.id}}),
     user: (parent) => prisma.user.findUnique({where:{id:parent.userId}}),
    },
    Answer: {
      application: (parent) => prisma.application.findUnique({where:{id:parent.applicationId}}),
    }
   };
