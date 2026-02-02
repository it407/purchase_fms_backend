import pool from "../../config/db.js";

export const findUserByUsername = async (username) => {
  const query = `
    SELECT id, username, password, role, page
    FROM app_users
    WHERE username = $1 AND is_active = true
  `;

  const { rows } = await pool.query(query, [username]);

  return rows[0];
};
