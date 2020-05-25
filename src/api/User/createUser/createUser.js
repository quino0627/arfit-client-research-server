export default {
  Mutation: {
    createUser: async (_, args, { prisma }) => {
      const { name, role } = args;
      // Role값을 주지 않았을 경우에는 기본적으로 일반 유저.
      if (role === undefined) {
        return prisma.user.create({
          data: {
            name,
            role: 'User',
          },
        });
      }
      return prisma.user.create({
        data: {
          name,
          role,
        },
      });
    },
  },
};
