import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    readClub: async (_, args, { request, isAuthenticated }) => {
        const { id } = args;
        return prisma.club.findUnique({
            where: { id: id }
        }  
        );
    },
  },
};