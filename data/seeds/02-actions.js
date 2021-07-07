exports.seed = async function(knex) {

  await knex('actions').insert([
    {
      id: 1,
      notes: "test",
      description: "test",
      project_id: 1,
      completed: true
      },
  ]);
};
