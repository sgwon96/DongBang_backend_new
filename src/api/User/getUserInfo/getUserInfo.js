import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    getUserInfo: async (_, args, { request, isAuthenticated }) => {
        isAuthenticated(request);
        const user = request.user;
        return prisma.user.findUnique({
            where: { userId: user.userId }
        }  
        );
    },
  },
};