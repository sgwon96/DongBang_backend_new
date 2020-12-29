import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    readPost: async (_, args, { request, isAuthenticated }) => {
        const { id } = args;
        return prisma.post.findUnique({
            where: { id: id }
        }  
        );
    },
  },
};