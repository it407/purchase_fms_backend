/* GET ALL FOLLOW UP */
export const GET_ALL_FOLLOW_UP = `
SELECT *
FROM follow_up
ORDER BY created_at DESC;
`;

/* UPDATE FOLLOW UP */
export const UPDATE_FOLLOW_UP = `
UPDATE follow_up
SET
  actual_at = NOW(),
  expected_date = $1,
  remark = $2,
  time_delay = (NOW() - planned_at)
WHERE id = $3
RETURNING *;
`;
