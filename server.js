'use strict';

require('core-js');

let graphqlHTTP = require('express-graphql');
let express = require('express');
let schema = require('./schema');

let app = express();

app.use('/graphql', graphqlHTTP({ schema: schema, pretty: true }));

app.listen(3000);
