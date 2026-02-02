import db from "../../config/db.js";
import {
  GET_ALL_SUBMIT_BILL,
  UPDATE_SUBMIT_BILL,
} from "./sql.js";

/* GET ALL Submit Bill */
export const getAllSubmitBillService = async () => {
  const result = await db.query(GET_ALL_SUBMIT_BILL);
  return result.rows;
};

/* UPDATE Submit Bill */
export const updateSubmitBillService = async (payload) => {
  const {
    id,
    bill_no,
    amount,
  } = payload;

  const result = await db.query(
    UPDATE_SUBMIT_BILL,
    [
      bill_no,
      amount,
      id,
    ]
  );

  if (result.rowCount === 0) {
    throw new Error("Submit Bill record not found");
  }

  return result.rows[0];
};
