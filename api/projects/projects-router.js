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
    const dish = await Dishes.add(req.body);
    res.status(201).json(dish);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error adding the dish"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Dishes.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The dish has been nuked" });
    } else {
      res.status(404).json({ message: "The dish could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the dish"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const dish = await Dishes.update(req.params.id, req.body);
    if (dish ) {
      res.status(200).json(dish);
    } else {
      res.status(404).json({ message: "The dish could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error updating the dish"
    });
  }
});

// an endpoint that returns all the recipes for a dish

router.get("/:id/recipes", async (req, res) => {
  const { id } = req.params;

  try {
    const recipes = await Dishes.findDishRecipes(id);

    if (recipes.length) {
      res.json(recipes);
    } else {
      res.status(404).json({ err: "no recipes for this dish" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});


// add an endpoint for adding new message to a hub
module.exports = router;
