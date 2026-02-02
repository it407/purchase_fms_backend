
// import pg from "pg";
// const { Pool } = pg;

// const pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "ankit123",
//   database: "fms_db",
//   port: 5432,
// });

// export default pool;





import pg from "pg";
import dotenv from "dotenv";
dotenv.config();


const { Pool } = pg;

const pool = new Pool({
   host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

export default pool;
