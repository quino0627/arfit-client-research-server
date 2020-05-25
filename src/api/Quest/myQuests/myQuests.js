import { PrismaClient } from '@prisma/client';

const ALL = 'ALL';
const FULFILLED = 'FULFILLED';
const UNFULFILLED = 'UNFULFILLED';

export default {
  Query: {
    myQuests: async (_, args, { prisma, request, isAuthenticated }) => {
      isAuthenticated(request);
      const { fulfill } = args;
      const { user } = request;
      console.log(user.id);
      if (fulfill === ALL) {
        return prisma.quest.findMany({
          where: {
            playerId: user.id,
          },
          orderBy: {
            when: 'desc',
          },
        });
      }
      if (fulfill === FULFILLED) {
        return prisma.quest.findMany({
          where: {
            AND: [{ playerId: user.id }],
            NOT: [{ feel: null }],
          },
          orderBy: {
            when: 'desc',
          },
        });
      }
      if (fulfill === UNFULFILLED) {
        return prisma.quest.findMany({
          where: {
            AND: [{ playerId: user.id }, { feel: null }],
          },
          orderBy: {
            when: 'desc',
          },
        });
      }
    },
  },
};
