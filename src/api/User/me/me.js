export default {
  Query: {
    me: async (_, __, { prisma, request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return user;
    },
  },
};
