const db = require("../../data/db-config");

module.exports = {
  getById,
  add
};

//get actions by id
function getById(id) {
  return db("actions")
    .where({ id })
    .first()
    .then(action => {
      if (action) {
        return action;
      } else {
        return null;
      }
    });
}

//add new action
function add(action) {
  return db("actions")
    .insert(action)
    .then(id => {
      return getById(id[0]);
    });
}
