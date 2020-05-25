export default {
  Quest: {
    player: ({ id }, __, { prisma }) =>
      prisma.quest.findOne({ where: { id } }).player(),

    exercise: ({ id }, __, { prisma }) =>
      prisma.quest
        .findOne({
          where: {
            id,
          },
        })
        .exercise(),
  },
};
