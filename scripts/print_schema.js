'use strict';

let graphql = require('graphql');
let schema = require('../schema');

let s = graphql.printSchema(schema);
console.log(s);
