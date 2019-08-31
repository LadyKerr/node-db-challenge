exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments("id"); // <<< primary key table 1
      tbl.string("name", 128).notNullable();
      tbl.string("description", 800).notNullable();
      tbl.boolean("completed").defaultTo(false);
    })
    .createTable("actions", tbl => {
      tbl.increments("id"); // <<< primary key table 2
      tbl.string("description", 800).notNullable();
      tbl.text("notes").notNullable();
      tbl.boolean("completed").defaultTo(false);

      //Foreign Key
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
};

exports.down = function(knex) {
  //drop tables in opposite order created
  return knex.schema.dropIfTableExists("actions").dropIfTableExists("projects");
};
