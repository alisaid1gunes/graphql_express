import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {UserResolver} from "./resolvers/UserResolver";
import {AppDataSource} from "./data-source";

const startServer = async () => {
    const schema = await buildSchema({
        resolvers:[UserResolver]
    });
    const server = new ApolloServer({schema});

    await AppDataSource.initialize();

    const app = express();
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
};

startServer();