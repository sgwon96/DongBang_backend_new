import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
   User: {
     clubMaster: (parent) => prisma.club.findUnique({where:{id:parent.clubId}}),
   },
   Club: {
    questions: (parent) => prisma.question.findMany({where:{clubId:parent.id}})
   },
   Question: {
    choices: (parent) => prisma.choice.findMany({where:{questionId:parent.id}})
   },
   Choice: {
    question: (parent) => prisma.question.findUnique({where:{id:parent.questionId}})
   },
   Application: {
     club: (parent) => prisma.club.findUnique({where:{id:parent.clubId}}),
     answers: (parent) => prisma.answer.findMany({where:{applicationId:parent.id}})
    },
   };
