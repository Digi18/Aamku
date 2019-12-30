const express = require('express');

const app = express();

app.use(require('./routes/saveSalesperson.js'));
app.use(require('./routes/generateClient.js'));
app.use(require('./routes/checkRole.js'));
app.use(require('./routes/getProducts.js'));
app.use(require('./routes/orders.js'));
app.use(require('./routes/getTotalCost.js'));
app.use(require('./routes/deleteOrders.js'));

const port = process.env.PORT || 3000;

app.listen(port,() => {

    console.log(`Server is running on ${port}.`);
});