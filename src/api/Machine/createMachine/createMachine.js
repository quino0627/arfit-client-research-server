export default {
  Mutation: {
    createMachine: async (_, args, { prisma, request, isAdmin }) => {
      isAdmin(request);
      const { name, description } = args;
      return prisma.machine.create({
        data: {
          name,
          description,
        },
      });
    },
  },
};
