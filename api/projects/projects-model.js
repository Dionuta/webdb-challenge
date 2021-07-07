const knex = require('knex');
const config = require("../../knexfile");
const db = knex(config.development);

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
  findActionsProjects
}; 

function find(query) {
  const { page = 1, limit = 10, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('projects')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db('projects')
    .where({ id })
    .then(projects => {
      return db('actions').where({project_id: id})
        .then(actions => {
          return {...projects, actions}
        })
    })
  
}

async function add(project) {
  const [id] = await db('projects').insert(project);

  return findById(id);
}

function remove(id) {
  return db('projects')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('projects')
    .where({ id })
    .update(changes, '*');
}

function findActionsProjects(projectId) {
  return db('actions as a')
    .join('projects', 'a.project_id', 'projects.id')
    .select('a.id as id', 'a.notes', 'a.description', 'a.completed','projects.id as project_Id')
    .where({ "project_Id": projectId });
}