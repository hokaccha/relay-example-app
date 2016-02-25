import React from 'react';
import Relay from 'react-relay';
import TodoItem from './todo_item';
import ReactDOM from 'react-dom';
import AddTodoMutation from '../mutations/add_todo_mutation';

class App extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    let text = ReactDOM.findDOMNode(this.refs.text).value;
    let app = this.props.app;
    Relay.Store.commitUpdate(new AddTodoMutation({ app, text }));
  }

  render() {
    return (
      <div className="TodoApp">
        <form className="TodoForm" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="text" />
          <input type="submit" />
        </form>
        <div className="TodoList">
          {this.props.app.todos.edges.map(({ node }) => <TodoItem key={node.id} todo={node} />)}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  prepareVariables() {
    return { first: 1000000 };
  },

  fragments: {
    app: () => Relay.QL`
      fragment on App {
        ${AddTodoMutation.getFragment('app')},
        todos(first: $first) {
          edges {
            node {
              id
              ${TodoItem.getFragment('todo')}
            }
          }
        }
      }
    `,
  },
});
