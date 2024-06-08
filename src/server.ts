import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';
import resolvers from './resolvers';

const typeDefs = gql`
  ${fs.readFileSync(path.join(__dirname, './schema.graphql'), 'utf8')}
`;

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Await server start

  const app = express();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server', error);
});
