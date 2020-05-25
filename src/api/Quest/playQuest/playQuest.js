export default {
  Mutation: {
    playQuest: async (_, args, { prisma, request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id, feel, isDone } = args;
      console.log(id, feel);
      try {
        const quest = await prisma.quest.update({
          where: {
            id,
          },
          data: {
            feel,
            isDone,
          },
        });
      } catch (e) {
        throw Error(e);
      }

      return true;
    },
  },
};
