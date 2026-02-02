/* GET ALL SUBMIT BILL */
export const GET_ALL_SUBMIT_BILL = `
SELECT *
FROM bill_submit
ORDER BY created_at DESC;
`;

/* UPDATE SUBMIT BILL */
export const UPDATE_SUBMIT_BILL = `
UPDATE bill_submit
SET
  actual_at = NOW(),
  bill_no = $1,
  amount = $2,
  time_delay = (NOW() - planned_at)
WHERE id = $3
RETURNING *;
`;
