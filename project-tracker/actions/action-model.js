const db = require("../../data/db-config");

module.exports = {
  get,
  getById,
  add,
  update,
  remove
};

//GET all actions
function get() {
  return db("actions");
}

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

//update actions
function update(changes, id) {
  return db("actions")
    .where({ id })
    .update(changes);
}

//delete actions
function remove(id) {
  return db("actions")
    .where({ id })
    .del();
}
