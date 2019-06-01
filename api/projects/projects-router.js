const Projects = require("./projects-model");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.find(req.query);
    res.status(200).json(projects);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the projects"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the project"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = await Projects.add(req.body);
    res.status(201).json(project);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error adding the project"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Projects.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The project has been nuked" });
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the project"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const project = await Projects.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error updating the project"
    });
  }
});

// an endpoint that returns all the recipes for a dish

router.get("/:id/actions", async (req, res) => {
  const { id } = req.params;

  try {
    const actions = await Projects.findActionsProjects(id);

    if (actions.length) {
      res.json(actions);
    } else {
      res.status(404).json({ err: "no actions for this project" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});


// add an endpoint for adding new message to a hub
module.exports = router;
