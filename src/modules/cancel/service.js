import pool from "../../config/db.js";

/* CREATE CANCEL */
export const createCancelService = async (indentId, remark, stage) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Fetch indent
    const { rows } = await client.query(
      `
      SELECT
        id,
        indent_number,
        product_number,
        supplier_name,
        material_name,
        quantity,
        rate
      FROM indents
      WHERE id = $1
      `,
      [indentId],
    );

    if (rows.length === 0) {
      throw new Error("Indent not found");
    }

    const i = rows[0];

    // 2️⃣ Insert into cancel_indents
    await client.query(
      `
      INSERT INTO cancel (
        indent_id,
        indent_no,
        product_no,
        supplier_name,
        material_name,
        quantity,
        rate,
        stage,
        remarks
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      `,
      [
        i.id,
        i.indent_number,
        i.product_number,
        i.supplier_name,
        i.material_name,
        i.quantity,
        i.rate,
        stage || "INDENT",
        remark,
      ],
    );

    // 3️⃣ Delete from indents
    await client.query(`DELETE FROM indents WHERE id = $1`, [indentId]);

    await client.query("COMMIT");

    return { indentId, status: "CANCELLED" };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

/* GET ALL CANCELS */
export const getAllCancelsService = async () => {
  const { rows } = await pool.query(`
    SELECT *
    FROM cancel
    ORDER BY timestamp DESC
  `);
  return rows;
};
