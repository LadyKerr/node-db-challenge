const express = require("express");

const Actions = require("./action-model");

const router = express.Router();

//add new action for existing project
//since actions have a relationship to projects, projects_id must be included
router.post("/:id/actions", (req, res) => {
  let newAction = req.body;
  const { description, notes } = req.params;
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
        res.status(500).json({ message: "There was an error adding action" });
      });
  }
});

module.exports = router;
