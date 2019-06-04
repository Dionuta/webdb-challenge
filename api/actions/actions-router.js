const Actions = require("./actions-model");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Actions.find(req.query);
    res.status(200).json(projects);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the actions"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Actions.findById(req.params.id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Action not found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the action"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = await Actions.add(req.body);
    res.status(201).json(project);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error adding the actions"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Actions.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The action has been nuked" });
    } else {
      res.status(404).json({ message: "The action could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the action"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const project = await Projects.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "The Action could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error updating the Action"
    });
  }
});


// add an endpoint for adding new message to a hub
module.exports = router;
