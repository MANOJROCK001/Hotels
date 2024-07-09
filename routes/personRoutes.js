const express = require("express");
const router = express.Router();
const Person = require("../models/person");

// Post route to add a person
router.post("/person", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create  a new person document using the mongoose model
    const newPerson = new Person(data);

    // Save the new person in the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// to get the person data
router.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// To get the person data on the basis of work type
router.get("/person/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // extract the work type from the URL parameters
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("data fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid WorkType" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update the person data
router.put("/person/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extract the id from URL parameter
    const updatedPersonData = req.body; // updated data for the person
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // returns the updated document
      runValidators: true, // run mongoose validation
    });
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete the person data
router.delete("/person/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extract the id from URL parameter
    // Assuming you have a Person model
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data deleted successfully");
    res.status(200).json({ message: "Person deleted successfully", data: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
