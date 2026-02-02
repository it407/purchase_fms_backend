/* GET ALL GATE ENTRY */
export const GET_ALL_GATE_ENTRY = `
SELECT *
FROM gate_entry
ORDER BY created_at DESC;
`;

/* UPDATE GATE ENTRY */
export const UPDATE_GATE_ENTRY = `
UPDATE gate_entry
SET
  actual_at = NOW(),
  vehicle_no = $1,
  driver_name = $2,
  attachment = COALESCE($3, attachment),
  time_delay = (NOW() - planned_at)
WHERE id = $4
RETURNING *;
`;
