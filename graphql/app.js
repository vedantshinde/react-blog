const Koa = require("koa");
const { ApolloServer} = require("apollo-server-koa");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs, resolvers } = require("./schemas");
const PORT = 4000;

async function startApolloServer(){

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers })
});
await server.start();

const app = new Koa();
server.applyMiddleware({ app });

await new Promise(resolve => app.listen({port: PORT}, resolve));
console.log(`Server ready at http://localhost:${PORT + server.graphqlPath}`);

return {server, app};
}

startApolloServer();