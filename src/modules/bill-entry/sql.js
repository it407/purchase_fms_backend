/* GET ALL ERP ENTRY */
export const GET_ALL_ERP_ENTRY = `
SELECT *
FROM erp_entry
ORDER BY created_at DESC;
`;

/* UPDATE ERP ENTRY */
export const UPDATE_ERP_ENTRY = `
UPDATE erp_entry
SET
  actual_at = NOW(),
  entered_by = $1,
  purchase_order_number = $2,
  time_delay = (NOW() - planned_at)
WHERE id = $3
RETURNING *;
`;
