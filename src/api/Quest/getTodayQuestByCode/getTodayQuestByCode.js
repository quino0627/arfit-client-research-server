import { convertCodeToExercise } from '../../../utils';
import { PrismaClient } from '@prisma/client';
export default {
  Query: {
    getTodayQuestByCode: async (
      _,
      args,
      { prisma, request, isAuthenticated }
    ) => {
      isAuthenticated(request);
      const { code } = args;
      const { user } = request;
      const exerciseId = convertCodeToExercise(code);
      if (exerciseId === null) throw Error('Wrong Code!');
      const quest = await prisma.quest.findMany({
        where: {
          playerId: user.id,
          exercise: {
            every: { id: exerciseId },
          },
        },
        orderBy: {
          when: 'desc',
        },
      });
      if (quest === null) throw Error('No Such Quest');
      console.log(quest[0]);
      if (quest[0].feel !== null) throw Error('DID ALL QUEST');
      return quest[0];
    },
  },
};
