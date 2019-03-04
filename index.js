const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const { Todo, validateTodo } = require("./todo.model");
const todoRoutes = express.Router();

const port = 4000;
const url = "mongodb://mongodb:27017/todos";

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection Success");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
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
  Todo.findById({ _id: req.params.id })
    .then(todo => {
      res.send(todo);
    })
    .catch(err => {
      res.status(400).send({ message: err });
    });
});

todoRoutes.route("/update/:id").post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) {
      res.status(404).json({ mssage: "data not found" });
    } else {
      Todo.updateOne({ _id: req.params.id }, req.body)
        .then(data => {
          res.status(200).send("Data updated");
        })
        .catch(err => {
          res.status(400).send("Update Failed");
        });
    }
  });
});

todoRoutes.route("/add").post(function(req, res) {
  Todo.create(req.body)
    .then(todo => {
      res.status(200).send("Todo added");
    })
    .catch(err => {
      res.status(400).send("Todo add failed");
    });
});

app.use("/todos", todoRoutes);

app.listen(port, function() {
  console.log(`Server is running on port: ${port}`);
});
