const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

let TodoSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      unique: true
    },
    responsible: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

function validateTodo(todo) {
  const schema = {
    description: Joi.string().required(),
    responsible: Joi.string().required(),
    priority: Joi.string().required(),
    completed: Joi.boolean()
  };
  return Joi.validate(todo, schema);
}

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  Todo,
  validateTodo
};
