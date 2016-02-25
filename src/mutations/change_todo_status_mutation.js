import Relay from 'react-relay';

export default class ChangeTodoStatusMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { changeTodoStatus }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ChangeTodoStatusPayload {
        todo {
          completed
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id
      }
    }];
  }

  getVariables() {
    return {
      id: this.props.todo.id,
      completed: this.props.completed
    };
  }

  getOptimisticResponse() {
    let { todo, completed } = this.props;

    return {
      todo: {
        id: todo.id,
        completed
      }
    };
  }
}

ChangeTodoStatusMutation.fragments = {
  // TODO: Mark numCompletedTodos optional.
  todo: () => Relay.QL`
    fragment on Todo {
      id
    }
  `
};
