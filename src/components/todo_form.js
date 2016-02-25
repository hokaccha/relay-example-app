import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import AddTodoMutation from '../mutations/add_todo_mutation';

export default class TodoForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    let text = ReactDOM.findDOMNode(this.refs.text).value;
    let app = this.props.app;
    Relay.Store.commitUpdate(new AddTodoMutation({ app, text }));
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
