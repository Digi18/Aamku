const express = require('express');

const app = express();

app.use(require('./routes/getGeneral.js'));
app.use(require('./routes/personal.js'));

const port = process.env.PORT || 3000;

app.listen(port,() => {

    console.log(`Server is running on ${port}.`);
});