export default {
  Query: {
    allUsers: (_, __, { prisma }) => prisma.user.findMany(),
  },
};
