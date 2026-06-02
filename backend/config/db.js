const initSqlJs = require('sql.js');

let db = null;

async function getDb() {
  if (!db) {
    const SQL = await initSqlJs();
    db = new SQL.Database();
  }
  return db;
}

module.exports = { getDb };