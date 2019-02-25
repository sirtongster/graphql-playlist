const express = require('express');
const graphqlHTTP = require('express-graphql');
const morgan = require('morgan');
const cors = require('cors');
const schema = require('./models');

const { mongoose } = require('./database');

// Initialize
const app = express();
// Settings
app.set('port', process.env.PORT);
// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));


module.exports = app;