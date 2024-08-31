const { Router } = require("express");
const router = Router();
const { List, Item } = require("../models/tasks");
const _ = require("lodash");
const { defaultItem } = require("../controllers/defaultItem");

router.get("/:customlistname", async (req, res) => {
  const customlistname = _.capitalize(req.params.customlistname);
  console.log(customlistname + " Webpage Successfully!!");

  try {
    const foundItem = await List.findOne({ name: customlistname });

    if (!foundItem) {
      console.log("Doesn't exist!!");

      const list = new List({
        name: customlistname,
        items: defaultItem,
      });
      console.log("Add common item to new todo list");
      await list.save();
      res.json({
        listitle: list.name,
        itemadds: list.items,
      });
      //   res.redirect(`/${customlistname}`);
    } else {
      console.log("user already Found");
      res.json({
        listitle: foundItem.name,
        itemadds: foundItem.items,
      });
      // res.redirect(`/${customlistname}`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/delete", async (req, res) => {
  const { checkedItemId, listName } = req.body;
  console.log(`This ID item is to be deleted: ${checkedItemId}`);

  if (listName) {
    try {
      await List.findOneAndUpdate(
        { "items._id": checkedItemId }, // Filter to find the document containing the item
        { $pull: { items: { _id: checkedItemId } } }, // Remove the item with the specified _id
        { new: true } // Return the updated document
      );

      console.log(`Successfully deleted item from DB, id: ${checkedItemId}`);
      res.redirect(`/${listName}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    console.log("Failed to find listName");
  }
});

router.post("/", async (req, res) => {
  const { additem: itemName, list: listName } = req.body;
  const item = new Item({ name: itemName });

  try {
    const foundItem = await List.findOne({ name: listName });

    if (!foundItem) {
      console.log(`List ${listName} not found.`);
      res.status(404).send("List not found");
      return;
    }

    foundItem.items.push(item);
    await foundItem.save();
    console.log(`Content saved & Website opened ${listName}`);
    res.redirect(`/${listName}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
