import pool from "../../config/db.js";

import { getNextIndentNumberQuery, insertIndentQuery } from "./indent.sql.js";
import { v4 as uuidv4 } from "uuid";

import {
  getAllIndentsQuery,
  updateIndentItemQuery,
} from "./indent.sql.js";


export const createIndentService = async (data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const {
      supplierName,
      poNumber,
      deliveryDate,
      qcRequired,
      createdBy,
      materials,
    } = data;

    // 1️⃣ Generate next indent number
    const { rows } = await client.query(getNextIndentNumberQuery);
    const lastIndent = rows[0]?.indent_number || "IN-000";
    const nextNumber =
      "IN-" + String(Number(lastIndent.split("-")[1]) + 1).padStart(3, "0");

    // 2️⃣ Insert each material as row
    for (let i = 0; i < materials.length; i++) {
      const m = materials[i];

      await client.query(insertIndentQuery, [
        uuidv4(),
        nextNumber,
        i + 1,
        poNumber,
        supplierName,
        m.materialName,
        m.quantity,
        m.unit,
        m.rate,
        deliveryDate,
        qcRequired,
        createdBy,
      ]);
    }

    await client.query("COMMIT");

    return { indentNumber: nextNumber };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};



export const getAllIndentsService = async () => {
  const { rows } = await pool.query(getAllIndentsQuery);
  return rows;
};



/* UPDATE */
// export const updateIndentItemService = async (id, data) => {
//   const {
//     materialName,
//     quantity,
//     rate,
//   } = data;

//   const { rows } = await pool.query(updateIndentItemQuery, [
//     materialName,
//     quantity,
//     rate,
//     id,
//   ]);

//   if (rows.length === 0) {
//     throw new Error("Indent not found");
//   }

//   return rows[0];
// };



export const updateIndentItemService = async (id, data) => {
  const fields = [];
  const values = [];
  let index = 1;

  const map = {
    poNo: "po_number",
    supplierName: "supplier_name",
    materialName: "material_name",
    quantity: "quantity",
    unit: "unit",
    rate: "rate",
    deliveryDate: "delivery_date",
  };

  for (const key in data) {
    if (data[key] !== undefined) {
      fields.push(`${map[key]} = $${index}`);
      values.push(data[key]);
      index++;
    }
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  const query = `
    UPDATE indents
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *
  `;

  values.push(id);

  const { rows } = await pool.query(query, values);

  if (!rows.length) {
    throw new Error("Indent not found");
  }

  return rows[0];
};
