'use strict';

let graphql = require('graphql');
let todo = require('./db/todo');

let todoType = new graphql.GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: { type: graphql.GraphQLString },
    text: { type: graphql.GraphQLString },
    completed: { type: graphql.GraphQLBoolean },
    created_at: { type: graphql.GraphQLString },
  }
});

let schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      todo: {
        type: todoType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: (_, args) => {
          return todo.find(args.id);
        }
      },
      todos: {
        type: new graphql.GraphQLList(todoType),
        resolve: () => {
          return todo.all();
        }
      },
    }
  }),
  mutation: new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addTodo: {
        type: todoType,
        args: {
          text: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
        },
        resolve: (_, args) => {
          return todo.create({ text: args.text });
        },
      },
      updateTodo: {
        type: todoType,
        args: {
          id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
          completed: { type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean) },
        },
        resolve: (_, args) => {
          return todo.update(args.id, args.completed).then(() => todo.find(args.id));
        },
      },
      deleteTodo: {
        type: graphql.GraphQLString,
        args: {
          id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        },
        resolve: (_, args) => {
          return todo.remove(args.id).then(() => args.id);
        },
      }
    }
  })
});

module.exports = schema;
