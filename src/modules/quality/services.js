import db from "../../config/db.js";
import {
  GET_ALL_QC,
  UPDATE_QC,
} from "./sql.js";

/* GET ALL QC */
export const getAllQCService = async () => {
  const result = await db.query(GET_ALL_QC);
  return result.rows;
};

/* UPDATE QC */
export const updateQCService = async (payload) => {
  const {
    id,
    qc_no,
    sample_result,
    approval_status,
    test_date,    
  } = payload;

  const result = await db.query(
    UPDATE_QC,
    [
      qc_no,
      sample_result,
      approval_status,
      test_date,
      id,
    ]
  );

  if (result.rowCount === 0) {
    throw new Error("QC record not found");
  }

  return result.rows[0];
};
