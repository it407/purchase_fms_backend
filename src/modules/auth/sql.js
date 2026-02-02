import pool from "../../config/db.js";

/* CREATE */
export const insertUser = async ({
  username,
  email,
  password,
  role,
  page,
}) => {
  const query = `
    INSERT INTO app_users
    (username, email, password, role, page)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING id, username, email, role, page, created_at;
  `;
  const values = [username, email, password, role, page];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

/* READ (FETCH USERS) */
export const getAllUsers = async () => {
  const { rows } = await pool.query(`
    SELECT id, username, email,password , role, page, created_at
    FROM app_users
    ORDER BY created_at DESC
  `);
  return rows;
};

/* DELETE */
export const deleteUserById = async (id) => {
  await pool.query(`DELETE FROM app_users WHERE id = $1`, [id]);
};
