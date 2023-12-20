const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    String,
    required: true,
    trim: true,
  },
});

const Category = model("Category", categorySchema);

module.exports = Category;
