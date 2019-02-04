const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

//connect to mlab database
mongoose.connect('mongodb://aaronlichan:marlarw1n@ds151124.mlab.com:51124/naythar');

mongoose.connection.once('open',()=>{
    console.log("Connected to the Database");
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000,()=>{
    console.log("now listening for request on port 4000");
})