
exports.up = async function(knex) {
    await knex.schema.createTable("projects", tbl => {
        tbl.increments("id");
        tbl
          .string("name")
          .notNullable();
        tbl
          .string("description");
        tbl
          .boolean("completed")
          .notNullable();    
    });
    await knex.schema.createTable("actions", tbl => {
        tbl.increments("id");
        tbl
          .string("notes")
        tbl
          .string("description");
        tbl
          .integer("project_id")
          .references("id")
          .inTable("projects")
          .onDelete("CASCADE")
          .onUpdate("CASCADE")
          .notNullable();
        tbl
          .boolean("completed")
          .notNullable(); ke
           
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('actions')
    await knex.schema.dropTableIfExists('projects')
};
