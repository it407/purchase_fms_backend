import db from "../../config/db.js";
import {
  GET_ALL_FOLLOW_UP,
  UPDATE_FOLLOW_UP,
} from "./sql.js";

/* GET ALL */
export const getAllFollowUpService = async () => {
  const result = await db.query(GET_ALL_FOLLOW_UP);
  return result.rows;
};

/* UPDATE FOLLOW UP */
export const updateFollowUpService = async (payload) => {
  const { follow_up_id, expected_date, remark } = payload;

  const result = await db.query(
    `
    UPDATE follow_up
    SET
      actual_at = NOW(),
      expected_date = $1,
      remark = $2,
      time_delay = (NOW() - planned_at)
    WHERE id = $3
    RETURNING *
    `,
    [
      expected_date,
      remark,
      follow_up_id,
    ]
  );

  if (result.rowCount === 0) {
    throw new Error("Follow-up not found for this indent");
  }

  return result.rows[0];
};

