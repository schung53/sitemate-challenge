const seedData = require('./data.json');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const issues = seedData;

app.get('/issues', (req, res) => {
  res.json(issues);
});

const port = 3000;
app.listen(port, () => {
  console.log('Server initialized and running on port ' + port);
});
