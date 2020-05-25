import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';
import { isAuthenticated, isAdmin } from './middlewares';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({
    request,
    isAuthenticated,
    isAdmin,
    prisma,
  }),
});

server.express.use(logger('dev'));

server.express.use(authenticateJwt);

server.start({ port: PORT }, () => {
  console.log(`SERVER RUNNING ON port ${PORT}`);
});
