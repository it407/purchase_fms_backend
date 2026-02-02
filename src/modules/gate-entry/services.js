import db from "../../config/db.js";
import {
  GET_ALL_GATE_ENTRY,
  UPDATE_GATE_ENTRY,
} from "./sql.js";

/* GET ALL GATE ENTRY */
export const getAllGateEntryService = async () => {
  const result = await db.query(GET_ALL_GATE_ENTRY);
  return result.rows;
};

/* UPDATE GATE ENTRY */
export const updateGateEntryService = async (payload) => {
  const {
    gate_entry_id,
    vehicle_no,
    driver_name,
    attachment,
  } = payload;

  const result = await db.query(
    UPDATE_GATE_ENTRY,
    [
      vehicle_no,
      driver_name,
      attachment,
      gate_entry_id,
    ]
  );

  if (result.rowCount === 0) {
    throw new Error("Gate Entry not found");
  }

  return result.rows[0];
};
