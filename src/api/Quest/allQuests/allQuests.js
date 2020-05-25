export default {
  Query: {
    allQuests: (_, __, { prisma }) => prisma.quest.findMany(),
  },
};
