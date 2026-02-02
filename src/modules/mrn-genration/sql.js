/* GET ALL MRN */
export const GET_ALL_MRN = `
SELECT *
FROM mrn
ORDER BY created_at DESC;
`;

/* UPDATE MRN */
export const UPDATE_MRN = `
UPDATE mrn
SET
  actual_at = NOW(),
  material_condition = $1,
  approved_by = $2,
  mrn_number = $3,
  time_delay = (NOW() - planned_at)
WHERE id = $4
RETURNING *;
`;
