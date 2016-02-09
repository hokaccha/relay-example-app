import React from 'react';
import ReactDOM from 'react-dom';
import todoStore from '../stores/todo_store';

export default class TodoItem extends React.Component {
  handleUpdate() {
    let value = ReactDOM.findDOMNode(this.refs.completed).checked;
    todoStore.update(this.props.todo.id, value);
  }

  handleDelete() {
    if (window.confirm('remove this todo?')) {
      todoStore.delete(this.props.todo.id);
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
