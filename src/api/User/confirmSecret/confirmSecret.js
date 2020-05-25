import { PrismaClient } from '@prisma/client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmSecret: async (_, args, { prisma }) => {
      const { secret } = args;
      console.log(secret);
      const user = await prisma.user.findOne({
        where: {
          loginSecret: secret,
        },
      });

      if (user) {
        return generateToken(user.loginSecret);
      }
      return null;
    },
  },
};
