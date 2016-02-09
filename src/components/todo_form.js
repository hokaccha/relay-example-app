import React from 'react';
import ReactDOM from 'react-dom';
import todoStore from '../stores/todo_store';

export default class TodoForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    let text = ReactDOM.findDOMNode(this.refs.text).value;
    todoStore.create(text);
  }

  render() {
    return (
      <form className="TodoForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" ref="text" />
        <input type="submit" />
      </form>
    );
  }
}
