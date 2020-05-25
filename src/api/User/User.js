export default {
  User: {
    QuestList: ({ id }, __, { prisma }) =>
      prisma.user.findOne({ where: { id } }).QuestList(),
  },
};
