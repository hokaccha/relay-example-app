import { EventEmitter } from 'events';

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.todos = [];
  }

  sendQuery(query) {
    return window.fetch('/graphql', {
      method: 'post',
      body: `query=${query}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then(response => response.json());
  }

  emitUpdate() {
    this.emit('update');
  }

  getAll() {
    return { todos: this.todos };
  }

  fetch() {
    return this.sendQuery('{ todos { id, text, completed } }').then(body => {
      this.todos = body.data.todos;
      this.emitUpdate();
    });
  }

  create(text) {
    return this.sendQuery(`mutation { addTodo(text: "${text}") { id, text, completed } }`).then(body => {
      this.todos.push(body.data.addTodo);
      this.emitUpdate();
    });
  }

  update(id, completed) {
    return this.sendQuery(`mutation { updateTodo(id: "${id}", completed: ${completed}) { id } }`).then(() => {
      let todo = this.todos.find(todo => todo.id === id);
      todo.completed = completed;
      this.emitUpdate();
    });
  }

  delete(id) {
    return this.sendQuery(`mutation { deleteTodo(id: "${id}") }`).then(() => {
      let idx = this.todos.findIndex(todo => todo.id === id);
      this.todos.splice(idx, 1);
      this.emitUpdate();
    });
  }
}

export default new TodoStore();
