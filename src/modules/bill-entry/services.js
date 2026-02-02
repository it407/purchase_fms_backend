import db from "../../config/db.js";
import {
  GET_ALL_ERP_ENTRY,
  UPDATE_ERP_ENTRY,
} from "./sql.js";

/* GET ALL ERP ENTRY */
export const getAllErpEntryService = async () => {
  const result = await db.query(GET_ALL_ERP_ENTRY);
  return result.rows;
};

/* UPDATE ERP ENTRY */
export const updateErpEntryService = async (payload) => {
  const {
    id,
    entered_by,
    purchase_order_number,
  } = payload;

  const result = await db.query(
    UPDATE_ERP_ENTRY,
    [
      entered_by,
      purchase_order_number,
      id,
    ]
  );

  if (result.rowCount === 0) {
    throw new Error("ERP Entry record not found");
  }

  return result.rows[0];
};
