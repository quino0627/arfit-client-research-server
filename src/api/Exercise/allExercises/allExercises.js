export default {
  Query: {
    allExercises: (_, __, { prisma }) => prisma.exercise.findMany(),
  },
};
