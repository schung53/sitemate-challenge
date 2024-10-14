const seedData = require('./data.json');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let issues = seedData;

app.get('/issues', (req, res) => {
  res.json(issues);
});

app.post('/issue', (req, res) => {
  console.log("Creating issue: ", req.body)
  const newIssue = {
    id: crypto.randomUUID(),
    title: req.body.title,
    description: req.body.description,
  }
  issues.push(newIssue);
  res.json({ message: "Object created", data: newIssue });
  console.log(issues);
});

app.put('/issue/:id', (req, res) => {
  console.log("Updating issue with ID: ", req.params.id);
  issues.forEach((issue) => {
    if (issue.id === req.params.id) {
      issue.title = req.body.title
      issue.description = req.body.description
    }
  }) 
  res.json({ message: "Object updated" });
  console.log(issues);
})

app.delete('/issue/:id', (req, res) => {
  console.log("Deleting issue with ID: ", req.params.id);
  issues = issues.filter((issue) => issue.id !== req.params.id);
  res.json({ message: "Object deleted" });
  console.log(issues);
})

const port = 3000;
app.listen(port, () => {
  console.log('Server initialized and running on port ' + port);
});
