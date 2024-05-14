const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const myReqLogger = require('./Utilities/requestLogger');
const myErrLogger = require('./Utilities/errorLogger');
const route = require('./Routes/routing');

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(myReqLogger);
app.use('/', route);
app.use(myErrLogger);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
