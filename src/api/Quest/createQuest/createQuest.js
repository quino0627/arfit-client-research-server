export default {
  Mutation: {
    createQuest: async (_, args, { prisma, request, isAdmin }) => {
      isAdmin(request);
      const { playerId, exerciseId, sets, reps, weight, when, isDone } = args;
      return prisma.quest.create({
        data: {
          player: {
            connect: {
              id: playerId,
            },
          },
          exercise: {
            connect: {
              id: exerciseId,
            },
          },
          sets,
          reps,
          weight,
          when: new Date(when),
          isDone,
        },
      });
    },
  },
};
