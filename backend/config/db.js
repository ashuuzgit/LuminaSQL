const Database = require('better-sqlite3');

// In-memory DB — lives as long as the server runs
const db = new Database(':memory:');

module.exports = db;