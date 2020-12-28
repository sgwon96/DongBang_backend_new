import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../../../utils";

const SALTROUNDS = 10;
const prisma = new PrismaClient();

export default {
  Mutation: {
    signIn: async (_, args) => {
      const { email, password } = args;
      console.log(email);
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      const passwordTrue = await bcrypt.compare(password, user.encryptedPassword);
      if (passwordTrue) {
        console.log(user);
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret combination");
      }
    },
  },
};
