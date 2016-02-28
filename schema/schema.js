'use strict';

let graphql = require('graphql');
let relay = require('graphql-relay');
let todo = require('../db/todo');
let app = { id: 1 };

let node = relay.nodeDefinitions(
  (globalId) => {
    let { type, id } = relay.fromGlobalId(globalId);
    if (type === 'App') {
      return app;
    }
    else {
      return todo.find(id);
    }
  },
  (obj) => {
    if (obj.text) {
      return todoType;
    }
    else {
      return appType;
    }
  }
);
let nodeInterface = node.nodeInterface;
let nodeField = node.nodeField;

let todoType = new graphql.GraphQLObjectType({
  name: 'Todo',
  interfaces: [nodeInterface],
  fields: {
    id: relay.globalIdField('Todo'),
    text: { type: graphql.GraphQLString },
    completed: { type: graphql.GraphQLBoolean },
    created_at: { type: graphql.GraphQLString },
  }
});

let connection = relay.connectionDefinitions({
  name: 'Todo',
  nodeType: todoType,
});

let appType = new graphql.GraphQLObjectType({
  name: 'App',
  interfaces: [nodeInterface],
  fields: {
    id: relay.globalIdField('App'),
    todos: {
      type: connection.connectionType,
      args: relay.connectionArgs,
      resolve: (_, args) => {
        return relay.connectionFromPromisedArray(todo.all(), args);
      }
    },
  }
});

let appField = {
  type: appType,
  resolve: () => app,
};

let addTodoMutationType = relay.mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    text: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
  outputFields: {
    app: appField,
    todoEdge: {
      type: connection.edgeType,
      resolve: (args) => {
        return Promise.all([ todo.all(), todo.find(args.id) ]).then(([todos, todo]) => {
          return {
            cursor: relay.cursorForObjectInConnection(todos.map(t => t.id), todo.id),
            node: todo,
          };
        });
      },
    },
  },
  mutateAndGetPayload: (args) => {
    return todo.create({ text: args.text });
  }
});

let changeTodoStatusMutationType = relay.mutationWithClientMutationId({
  name: 'ChangeTodoStatus',
  inputFields: {
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) },
    completed: { type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean) }
  },
  outputFields: {
    todo: {
      type: todoType,
      resolve: (args) => todo.find(args.todoId)
    }
  },
  mutateAndGetPayload: (args) => {
    let todoId = relay.fromGlobalId(args.id).id;
    return todo.update(todoId, args.completed).then(() => ({ todoId: todoId }));
  }
});

let removeTodoMutationType = relay.mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) },
  },
  outputFields: {
    app: appField,
    deletedTodoId: {
      type: graphql.GraphQLID,
      resolve: (args) => args.id
    }
  },
  mutateAndGetPayload: (args) => {
    let id = relay.fromGlobalId(args.id).id;
    return todo.remove(id).then(() => ({ id }));
  },
});

let schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      node: nodeField,
      app: appField,
    }
  }),
  mutation: new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addTodo: addTodoMutationType,
      changeTodoStatus: changeTodoStatusMutationType,
      removeTodo: removeTodoMutationType
    }
  })
});

module.exports = schema;
