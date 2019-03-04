const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const todoRoutes = express.Router();

const port = 4000;
const url = "mongodb://mongo:27017/todos";
app.use(bodyParser.json());

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection Success");
});

todoRoutes.route("/").get(function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
});

todoRoutes.route("/update/:id").post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) {
      res.status(404).json({ mssage: "data not found" });
    } else {
      todo.todo_description = req.body.todo_description;
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_priority = req.body.todo_priority;
      todo.todo_completed = req.body.todo_completed;

      todo
        .save()
        .then(todo => {
          res.json({ message: "Todo updated" });
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

todoRoutes.route("/add").post(function(req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.status(200).json({ todo: "Todo added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new todo failed");
    });
});

app.use("/todos", todoRoutes);

app.listen(PORT, function() {
  console.log(`Server is running on port: ${PORT}`);
});
