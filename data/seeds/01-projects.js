
exports.seed = async function(knex) {

      await knex('projects').insert([
        {
          id: 1,
          name: "Scoreboard--React-App",
          description: "The goal of this project is to create a dynamic scoreboard using React.",
          completed: true
          },
      ]);
};
