
/* =========================
   GET ALL ISSUE PO
========================= */
export const GET_ALL_ISSUE_PO = `
SELECT *
FROM issue_po
ORDER BY created_at DESC;
`;


export const UPDATE_ISSUE_PO = `
UPDATE issue_po
SET
  actual_at = NOW(),
  issue_date = $1,
  supplier_contact = $2,
  mode_of_send = $3,
  attachment = $4,
  time_delay = (NOW() - planned_at)
WHERE indent_id = $5
RETURNING *;
`;
