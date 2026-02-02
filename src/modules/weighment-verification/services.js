import db from "../../config/db.js";
import {
  GET_ALL_WEIGHMENT_VERIFICATION,
  UPDATE_WEIGHMENT_VERIFICATION,
} from "./sql.js";

/* GET ALL GATE ENTRY */
export const getAllWeighmentVerificationService = async () => {
  const result = await db.query(GET_ALL_WEIGHMENT_VERIFICATION);
  return result.rows;
};

/* UPDATE GATE ENTRY */
export const updateWeighmentVerificationService = async (payload) => {
  const {
    id,
    gross_weight,
    tare_weight,
    verified_by,
    attachment,
  } = payload;

  const result = await db.query(
    UPDATE_WEIGHMENT_VERIFICATION,
    [
      gross_weight,
      tare_weight,
      verified_by,
      attachment,
      id,
    ]
  );

  if (result.rowCount === 0) {
    throw new Error("Weighment verification not found");
  }

  return result.rows[0];
};

