import React from 'react';
import todoStore from '../stores/todo_store';
import TodoForm from './todo_form';
import TodoList from './todo_list';

export default class TodoApp extends React.Component {
  constructor() {
    super();
    this.state = todoStore.getAll();
  }

  componentDidMount() {
    todoStore.on('update', () => this.setState(todoStore.getAll()));
    todoStore.fetch();
  }

  render() {
    return (
      <div className="TodoApp">
        <h1>Todo App</h1>
        <TodoForm />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}
