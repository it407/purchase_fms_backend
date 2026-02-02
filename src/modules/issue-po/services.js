
import db from "../../config/db.js";
import {
  GET_ALL_ISSUE_PO,
  UPDATE_ISSUE_PO,
} from "./sql.js";


/* GET ALL */
export const getAllIssuePoService = async () => {
  const result = await db.query(GET_ALL_ISSUE_PO);
  return result.rows;
};




export const updateIssuePoService = async (payload) => {
  const {
    indent_id,
    issue_date,
    supplier_contact,
    mode_of_send,
    attachment,
  } = payload;

  let query = `
    UPDATE issue_po
    SET
      actual_at = NOW(),
      issue_date = ($1::date + CURRENT_TIME),
      supplier_contact = $2,
      mode_of_send = $3,
      time_delay = (NOW() - planned_at)
  `;

  const values = [issue_date, supplier_contact, mode_of_send];
  let paramIndex = 4;

  // ⭐ ONLY IF attachment exists
  if (attachment) {
    query += `, attachment = $${paramIndex}`;
    values.push(attachment);
    paramIndex++;
  }

  query += `
    WHERE indent_id = $${paramIndex}
    RETURNING *;
  `;

  values.push(indent_id);

  const result = await db.query(query, values);

  if (result.rowCount === 0) {
    throw new Error("Issue PO not found for this indent");
  }

  return result.rows[0];
};
