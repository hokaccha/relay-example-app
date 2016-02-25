'use strict';

let fs = require('fs');
let path = require('path');
let graphql = require('graphql');
let introspectionQuery = require('graphql/utilities').introspectionQuery;
let schema = require('../schema');

fs.writeFileSync(path.join(__dirname, '../schema.graphql'), graphql.printSchema(schema));

graphql.graphql(schema, introspectionQuery).then(result => {
  if (result.errors) return console.error(result.errors);
  fs.writeFileSync(path.join(__dirname, '../schema.json'), JSON.stringify(result, null, 2));
});
