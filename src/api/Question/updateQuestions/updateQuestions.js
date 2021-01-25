import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

 export default {
   Mutation: {
     updateQuestions: async (_, args, { request, isAuthenticated }) => {
        const { Questions } = args;
        const updatedQuestions = await Questions.map(async (Question) => {
            const { id,index,title,type,choiceIds,choiceSubjects} = Question;
            const { user } = request;
            const question = await prisma.question.findUnique({where:{id:id}});
           if(question == null){
             throw Error("질문이 존재하지 않습니다.");
           } else if(question.clubId != user.clubId){
            throw Error("질문 작성자가 아닙니다.");  
           }
    
           if( question.type == "short"){
                await prisma.question.update({
                where: { id: id },
                data: { index,title }
              });
              return await prisma.question.findUnique({where:{id:id}});
           } else if (question.type == "multiple"){
                await choiceIds.map(async (choiceId,index) => {  
                   try{
                    const choice = await prisma.choice.findUnique({where:{id:choiceId}});
                    if(choice == null){
                        throw Error("선택지가 없습니다")
                    }else if(choice.questionId != question.id ){
                        throw Error("선택지가 질문에 포함되어 있지 않습니다.")
                    } 
                     await prisma.choice.update({
                        where:{ id: choiceId},
                        data:{subject:choiceSubjects[index]}
                    });
                   } catch (e){
                       console.log(e);
                   }
                })
                return await prisma.question.update({where:{id:id}, data: {index, title}})     
           }   
        });
       return updatedQuestions;
     }
   }
 };