const express = require("express");

const Projects = require("./project-model");

const router = express.Router();

//get all projects
router.get("/", (req, res) => {
  Projects.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error retrieving projects."
      });
    });
});

//show projects by their id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Projects.getById(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ message: "The project with that ID doesnt exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error getting that project." });
    });
});

//add new project
router.post("/", (req, res) => {
  const { name, description } = req.params;

  if (!name || !description) {
    res.status(400).json({ errorMessage: "Please add name and description." });
  } else {
    Projects.add(req.body)
      .then(newProject => {
        res.status(200).json(newProject);
      })
      .catch(err => {
        res.status(500).json({ message: "There was an error adding project" });
      });
  }
});

module.exports = router;
