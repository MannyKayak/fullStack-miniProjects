import Database from "better-sqlite3";

const db = new Database("db.sqlite", {
  verbose: console.log,
});

db.pragma("journal_mode = WAL");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    content TEXT,
    createdAt TEXT,
    updatedAt TEXT
  )
`
).run();

export default db;
