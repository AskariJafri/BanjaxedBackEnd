import { graphqlHTTP } from "express-graphql";
const express = require("express");
const { buildSchema } = require("graphql");
import {resolvers} from "./resolvers"
const fs = require("fs");
const schema = buildSchema(fs.readFileSync("schema.graphql").toString());
const cors = require('cors');

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("GraphQL server running at http://localhost:4000/graphql");
});
