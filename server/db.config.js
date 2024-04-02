require("dotenv").config();
import { Pool } from "pg";

const database = process.env.PGDATABASE;

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`;

const pool = new Pool({
  connectionString: connectionString,
});

export function query(text, params) { return pool.query(text, params); }
export function end() { return pool.end(); }