DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos
  (text, completed)
VALUES
  ('foo', 0),
  ('bar', 0),
  ('baz', 1)
;
