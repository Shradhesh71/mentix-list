const { Schema, model } = require("mongoose");

// Define the Item schema
const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

// Define the List schema
const listSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    items: [itemSchema],
}, { timestamps: true });

const Item = model('Item', itemSchema);
const List = model('List', listSchema);

module.exports = { Item, List };
