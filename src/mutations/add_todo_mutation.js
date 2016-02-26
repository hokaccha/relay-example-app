import Relay from 'react-relay';

export default class AddTodoMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { addTodo }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddTodoPayload {
        app { todos },
        todoEdge
      }
    `;
  }

  getVariables() {
    return { text: this.props.text };
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'app',
        parentID: this.props.app.id,
        connectionName: 'todos',
        edgeName: 'todoEdge',
        rangeBehaviors: {
          '': 'append',
        }
      }
    ];
  }

  // サーバー側のデータが反映されるまでのプレースホルダー的なもの？
  getOptimisticResponse() {
    return {
      todoEdge: {
        node: {
          text: this.props.text,
          completed: false,
        }
      }
    };
  }
}

AddTodoMutation.fragments = {
  app: () => Relay.QL`
    fragment on App {
      id
    }
  `
};
