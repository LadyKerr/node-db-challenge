const db = require("../../data/db-config");

module.exports = {
  get,
  getById,
  add
};

//GET all projects
function get() {
  return db("projects");
}

//GET project by ID return null if id is invalid
function getById(id) {
  return db("projects")
    .where({ id })
    .first()
    .then(project => {
      if (project) {
        return project;
      } else {
        return null;
      }
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
