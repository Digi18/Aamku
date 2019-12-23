const express = require('express');

const app = express();

app.use(require('./routes/saveSalesperson.js'));
app.use(require('./routes/generateClient.js'));
app.use(require('./routes/checkRole.js'));

const port = process.env.PORT || 3000;

app.listen(port,() => {

    console.log(`Server is running on ${port}.`);
});