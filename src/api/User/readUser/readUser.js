import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    readUser: async (_, args, { request, isAuthenticated }) => {
        const { id } = args;
        return prisma.user.findUnique({
            where: { id: id }
        }  
        );
    },
  },
};