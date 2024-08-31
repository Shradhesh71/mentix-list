const { Item } = require("../models/tasks");

const item1 = new Item({
  name: "Wlecome to your To do list",
});
const item2 = new Item({
  name: "Hit the + button to add a new item",
});
const item3 = new Item({
  name: "<--Hit this to delete an item",
});
const defaultItem = [item1, item2, item3];

module.exports = { defaultItem };
