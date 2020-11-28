import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default {
    Mutation: {
      createAccount: async (_, args) => {
        const { username } = args;
        const users = await prisma.user.create({
            data: {
              email: 'johnsdsd@prisma.iod',
              name: 'John',
              Profile: {
                create: { 
                  bio: "Hello World"
                }
              }
            },
          })
        return users;
      }
    }
  };