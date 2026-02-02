import db from "../../config/db.js";
import {
  GET_ALL_MRN,
  UPDATE_MRN,
} from "./sql.js";

/* GET ALL MRN */
export const getAllMRNService = async () => {
  const result = await db.query(GET_ALL_MRN);
  return result.rows;
};

/* UPDATE MRN */
export const updateMRNService = async (payload) => {
  const {
    id,
    material_condition,
    approved_by,
    mrn_number
  } = payload;

  const result = await db.query(
    UPDATE_MRN,
    [
      material_condition,
      approved_by,
      mrn_number,
      id,
    ]
  );

  if (result.rowCount === 0) {
    throw new Error("MRN record not found");
  }

  return result.rows[0];
};
