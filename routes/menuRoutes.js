const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menu");

// post route to add a menu item
router.post("/menuItem", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the menu items data

    // Create  a new menu items document using the mongoose model
    const newMenuItem = new MenuItem(data);

    // Save the new menuItem in the database
    const response = await newMenuItem.save();
    console.log("data saved");
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// to get the menuItems from the database
router.get("/menuItem", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// To get the menuItems from the data base on the basis of taste

router.get("/menuItem/:TasteType", async (req, res) => {
  try {
    const TasteType = req.params.TasteType; // extract the tasteType from the URL parameters
    if (TasteType == "sweet" || TasteType == "spicy" || TasteType == "sour") {
      const response = await MenuItem.find({ taste: TasteType });
      console.log("data fetched");
      res.status(200).json(response);
    } else {
      console.log("Invalid Taste type");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Update the menuItem data
router.put("/menuItem/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id; // extract the id from URL parameter
    const updatedMenuItemData = req.body; // updated data for the person
    const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
      new: true, // returns the updated document
      runValidators: true, // run mongoose validation
    });
    if (!response) {
      return res.status(404).json({ error: "Menu Item not found" });
    }
    console.log("Data Updated successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete the MenuItem data
router.delete("/menuItem/:id", async (req, res) => {
  try {
    const menuItemId = req.params.id; // extract the id from URL parameter
    // Assuming you have a menuItem model
    const response = await MenuItem.findByIdAndDelete(menuItemId);
    if (!response) {
      return res.status(404).json({ error: "Menu Item not found" });
    }
    console.log("Data deleted successfully");
    res.status(200).json({ message: "Menu Item deleted successfully", data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
