import React from 'react';
import Relay from 'react-relay';
import ChangeTodoStatusMutation from '../mutations/change_todo_status_mutation';
import RemoveTodoMutation from '../mutations/remove_todo_mutation';

class TodoItem extends React.Component {
  handleUpdate(e) {
    let todo = this.props.todo;
    let completed = e.target.checked;

    Relay.Store.commitUpdate(new ChangeTodoStatusMutation({ todo, completed }));
  }

  handleDelete() {
    if (window.confirm('remove this todo?')) {
      Relay.Store.commitUpdate(new RemoveTodoMutation({ todo: this.props.todo, app: this.props.app }));
    }
  }

  render() {
    let { text, completed } = this.props.todo;

    return (
      <div className="TodoItem">
        <div>
          <button onClick={this.handleDelete.bind(this)}>x</button>
          <input type="checkbox" checked={completed} ref="completed" onChange={this.handleUpdate.bind(this)} />
          <span>{text}</span>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(TodoItem, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        id
        text
        completed
        ${ChangeTodoStatusMutation.getFragment('todo')}
        ${RemoveTodoMutation.getFragment('todo')}
      }
    `,
    app: () => Relay.QL`
      fragment on App {
        ${RemoveTodoMutation.getFragment('app')}
      }
    `,
  }
});
