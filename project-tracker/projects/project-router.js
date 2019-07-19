const express = require("express");

const Projects = require("./project-model");
const Actions = require("../actions/action-model");

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
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400).json({ errorMessage: "Please add name and description." });
  } else {
    Projects.add(req.body)
      .then(newProject => {
        res.status(200).json(newProject);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "There was an error adding project" });
      });
  }
});

//add new action for existing project
//since actions have a relationship to projects, projects_id must be included
router.post("/:id/actions", (req, res) => {
  let newAction = req.body;
  const { description, notes } = req.body;
  const { id } = req.params;
  newAction.project_id = id;

  if (!description || !notes) {
    res.status(400).json({ errorMessage: "Please add notes and description." });
  } else {
    Actions.add(req.body)
      .then(newAction => {
        res.status(200).json(newAction);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "There was an error adding action" });
      });
  }
});

//update project
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const { description, name } = req.body;

  Projects.update(id, changes)
    .then(updated => {
      if (!updated) {
        res
          .status(404)
          .json({ message: "The project with that ID does not exist." });
      } else if (!description || !name) {
        res.status(400).json({
          errorMessage: "Please provide description and name for the project."
        });
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The project could not be modified." });
    });
});

//delete projects
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Projects.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(404).json({
          message: "The project with that ID is not in the database."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The project could not be deleted." });
    });
});

module.exports = router;
