const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// スキーマの定義
const schema = buildSchema(`
  type ToDo {
    id: ID!
    title: String!
  }

  type Query {
    todos: [ToDo]
  }

  # ToDo追加のための入力型を定義
  input ToDoInput {
    title: String!
  }

  # ToDo追加のMutationを定義
  type Mutation {
    addToDo(input: ToDoInput): ToDo
  }
`);

let fakeDataBase = [
  { id: '1', title: 'Sample ToDo 1' },
  { id: '2', title: 'Sample ToDo 2' },
];

// リゾルバの定義
const root = {
  todos: () => fakeDataBase,

  // Mutationのリゾルバを実装
  addToDo: ({ input }) => {
    const todo = {
      id: new Date().getTime().toString(),
      title: input.title,
    };
    fakeDataBase.push(todo);
    return todo;
  },
};

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphql: true, // GraphQLの有効化
}));

app.listen(4000);
