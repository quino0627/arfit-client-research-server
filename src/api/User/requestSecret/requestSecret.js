import { generateSecret } from '../../../utils';

export default {
  Mutation: {
    requestSecret: async (_, args, { prisma }) => {
      const { id } = args;
      let loginSecret = generateSecret();
      try {
        const isExist = await prisma.user.findMany({
          where: {
            loginSecret,
          },
        });
        if (isExist.length === 0) {
          await prisma.user.update({
            where: {
              id,
            },
            data: {
              loginSecret,
            },
          });
          return true;
        }
      } catch (e) {
        Error(e);
        return false;
      }
      return false;
    },
  },
};
