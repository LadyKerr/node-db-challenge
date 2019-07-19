const db = require("../../data/db-config");

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
  getProjectActions
};

//GET all projects
function get() {
  return db("projects");
}

//GET project by ID return null if id is invalid; also return array with actions
function getById(id) {
  return db("projects")
    .where({ id })
    .first()
    .then(project => {
      if (project) {
        return getProjectActions(id).then(actions => {
          project.action = actions;
          return project;
        });
      } else {
        return null;
      }
    });
}

function getProjectActions(projectId) {
  return db("actions")
    .where("project_id", projectId)
    .then(action => {
      return action;
    });
}

//POST (add) new projects
function add(project) {
  return db("projects")
    .insert(project)
    .then(id => {
      return getById(id[0]);
    });
}

//update projects
function update(changes, id) {
  return db("projects")
    .where({ id })
    .update(changes);
}

//delete projects
function remove(id) {
  return db("projects")
    .where({ id })
    .del();
}
