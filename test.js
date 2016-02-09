'use strict';

let schema = require('./schema');
let graphql = require('graphql').graphql;

function execute(query) {
  return graphql(schema, query).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    console.log(`
request
-------
${query}

response
--------
${JSON.stringify(result, null, 2)}`);
  });
}

Promise.resolve()
  .then(() => execute('{ todos { id, text, completed } }'))
  .then(() => execute('{ todo(id: "1") { id, text, completed } }'))
  .then(() => execute('mutation { addTodo(text: "new todo") { id, text, completed } }'))
  .then(() => execute('mutation { updateTodo(id: "1", completed: true) { id, text, completed } }'))
  .then(() => execute('mutation { deleteTodo(id: "2") }'))
  .then(() => execute('{ todos { id, text, completed } }'))
  .catch((err) => {
    console.log('error:');
    console.log(err[0].message);
  })
;
