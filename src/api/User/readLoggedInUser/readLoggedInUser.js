import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    readLoggedInUser: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const { user } = request;
        return prisma.user.findUnique({where:{id:user.id}});
    },
  },
};