export default {
  Mutation: {
    createExercise: async (_, args, { prisma, request, isAdmin }) => {
      isAdmin(request);
      const { name, machineId, muscleMain, muscleSub } = args;
      return prisma.exercise.create({
        data: {
          name,
          muscleMain,
          muscleSub,
          machine: {
            connect: {
              id: machineId,
            },
          },
        },
      });
    },
  },
};
