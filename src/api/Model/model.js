import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
   User: {
     clubMaster: (parent) => prisma.club.findUnique({where:{id:parent.clubId}}),
   },
   Club: {
    questions: (parent) => prisma.question.findMany({where:{clubId:parent.id}})
   },
   
 };