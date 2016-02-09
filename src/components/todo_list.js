import React from 'react';
import TodoItem from './todo_item';

export default class TodoList extends React.Component {
  render() {
    return (
      <div className="TodoList">
        {this.props.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </div>
    );
  }
}
