const knex = require('knex');
const config = require("../../knexfile");
const db = knex(config.development);

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
}; 

function find(query) {
  const { page = 1, limit = 10, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('actions')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db('actions')
    .where({ id })
  
}

async function add(project) {
  const [id] = await db('actions').insert(project);

  return findById(id);
}

function remove(id) {
  return db('actions')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('actions')
    .where({ id })
    .update(changes, '*');
}

