/* GET ALL QC */
export const GET_ALL_QC = `
SELECT *
FROM qc
ORDER BY created_at DESC;
`;

/* UPDATE QC */
export const UPDATE_QC = `
UPDATE qc
SET
  actual_at = NOW(),
  qc_no = $1,
  sample_result = $2,
  approval_status = $3,
  test_date = $4,                -- ✅ ADD
  time_delay = (NOW() - planned_at)
WHERE id = $5
RETURNING *;
`;

