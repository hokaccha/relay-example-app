'use strict';

let sqlite3 = require('sqlite3');
let db = new sqlite3.Database(`${__dirname}/todo.sqlite3`);

function allQuery(sql) {
  let params = Array.prototype.slice.call(arguments, 1);

  return new Promise((resolve, reject) => {
    db.prepare(sql, params).all((err, rows) => {
      if (err) return reject(err);

      resolve(rows);
    });
  });
}

function runQuery(sql) {
  let params = Array.prototype.slice.call(arguments, 1);

  return new Promise((resolve, reject) => {
    db.prepare(sql, params).run(function(err) {
      if (err) return reject(err);

      resolve(this.lastID);
    });
  });
}

function all() {
  return allQuery('select * from todos');
}

function find(id) {
  return allQuery('select * from todos where id = ?', id).then(rows => rows[0]);
}

function create(params) {
  let text = params.text;
  let completed = params.completed ? 1 : 0;

  return runQuery('insert into todos (text, completed) values (?, ?)', text, completed).then(find);
}

function update(id, completed) {
  completed = completed ? 1 : 0;
  return runQuery('update todos set completed = ? where id = ?', completed, id);
}

function remove(id) {
  return runQuery('delete from todos where id = ?', id);
}

module.exports = {
  all, find, create, update, remove
};
