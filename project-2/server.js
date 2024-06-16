const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 8080;

// Define APIs using GraphQL SDL
const typeDefs = gql`
   type Query {
       sayHello(name: String!): String!
       hi(name: String!): String!
   }

   type Mutation {
       sayHello(name: String!): String!
        hi(name: String!, age: Int!, address: String!, phone: Int!): String!
   }
`;

// Define resolvers map for API definitions in SDL
const resolvers = {
   Query: {
       sayHello: (obj, args, context, info) => {
           return `Hello ${ args.name }!`;
       },
         hi: (obj, args, context, info) => {
              return `Hi ${ args.name }!`;
         }
   },

   Mutation: {
       sayHello: (obj, args, context, info) => {
           return `Hello ${ args.name }!`;
       },
       hi: (obj, {name,age,address,phone}, context, info) => {
           return `Hi ${ name}! You are ${age} years old, live in ${address} and your phone number is ${phone}.`;
       }
   }
};

// Configure express
const express = require('express');
const app = express();

// Create ApolloServer instance with schema
const server = new ApolloServer({
   typeDefs,
   resolvers,
});

// Start the server asynchronously and apply middleware
async function startApolloServer() {
   await server.start();
   server.applyMiddleware({ app });
}

// Start the Apollo Server and Express app
startApolloServer().then(() => {
   app.listen({ port }, () =>
      console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
   );
});
