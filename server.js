'use strict';

require('core-js');

let graphqlHTTP = require('express-graphql');
let express = require('express');
let schema = require('./schema/schema');

let app = express();

app.use('/graphql', graphqlHTTP({ schema: schema, pretty: true }));
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('listen: http://localhost:3000');
});
