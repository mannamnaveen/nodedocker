const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TodoSchema = new Schema(
  {
    todo_description: {
      type: String,
      required: true,
      unique: true
    },
    todo_responsible: {
      type: String,
      required: true
    },
    todo_priority: {
      type: String
    },
    todo_completed: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
