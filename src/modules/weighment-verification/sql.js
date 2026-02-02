/* GET ALL GATE ENTRY */
export const GET_ALL_WEIGHMENT_VERIFICATION = `
SELECT *
FROM weighment_verification
ORDER BY created_at DESC;
`;

/* UPDATE GATE ENTRY */
export const UPDATE_WEIGHMENT_VERIFICATION = `
UPDATE weighment_verification
SET
  actual_at = NOW(),
  gross_weight = $1,
  tare_weight = $2,
  verified_by = $3,
 attachment = COALESCE($4, attachment),
  time_delay = (NOW() - planned_at)
WHERE id = $5
RETURNING *;
`;

