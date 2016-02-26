import Relay from 'react-relay';

export default class RemoveTodoMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { removeTodo }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveTodoPayload {
        deletedTodoId
        app
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'app',
      parentID: this.props.app.id,
      connectionName: 'todos',
      deletedIDFieldName: 'deletedTodoId',
    }];
  }

  getVariables() {
    return {
      id: this.props.todo.id,
    };
  }

  getOptimisticResponse() {
    return { deletedTodoId: this.props.todo.id };
  }
}

RemoveTodoMutation.fragments = {
  todo: () => Relay.QL`
    fragment on Todo {
      id
    }
  `,
  app: () => Relay.QL`
    fragment on App {
      id
    }
  `,
};
