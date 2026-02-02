export const getNextIndentNumberQuery = `
  SELECT indent_number
  FROM indents
  ORDER BY created_at DESC
  LIMIT 1
`;

export const insertIndentQuery = `
  INSERT INTO indents (
    id,
    indent_number,
    product_number,
    po_number,
    supplier_name,
    material_name,
    quantity,
    unit,
    rate,
    delivery_date,
    qc_required,
    created_by
  )
  VALUES (
    $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
  )
`;

/* GET */
// export const getAllIndentsQuery = `
//   SELECT
//     id,
//     indent_number AS "indentNumber",
//     product_number AS "productNumber",
//     supplier_name AS "supplierName",
//     po_number AS "poNumber",
//     material_name AS "materialName",
//     quantity,
//     unit,
//     rate,
//     delivery_date AS "deliveryDate",
//     qc_required AS "qcRequired",
//     status,
//     created_by AS "createdBy",
//     created_at AS "createdAt"
//   FROM indents
//   ORDER BY created_at DESC
// `;


export const getAllIndentsQuery = `
  SELECT
    i.id,
    i.indent_number AS "indentNumber",
    i.product_number AS "productNumber",
    i.po_number AS "poNumber",
    i.supplier_name AS "supplierName",
    i.material_name AS "materialName",
    i.quantity,
    i.unit,
    i.rate,
    i.delivery_date AS "deliveryDate",
    i.qc_required AS "qcRequired",
    i.created_by AS "createdBy",
    i.created_at AS "createdAt",

    CASE
      WHEN c.indent_id IS NOT NULL
        THEN CONCAT('Cancelled (', c.stage, ')')

      WHEN ip.actual_at IS NULL THEN 'Issue PO'
      WHEN fu.actual_at IS NULL THEN 'Follow Up'
      WHEN ge.actual_at IS NULL THEN 'Gate Entry'
      WHEN wv.actual_at IS NULL THEN 'Weighment'
      WHEN qc.actual_at IS NULL THEN 'QC'
      WHEN mr.actual_at IS NULL THEN 'MRN'
      WHEN bs.actual_at IS NULL THEN 'Bill Submit'
      WHEN erp.actual_at IS NULL THEN 'ERP Entry'

      ELSE 'Completed'
    END AS status

  FROM indents i

  LEFT JOIN issue_po ip ON ip.indent_id = i.id
  LEFT JOIN follow_up fu ON fu.indent_id = i.id
  LEFT JOIN gate_entry ge ON ge.indent_id = i.id
  LEFT JOIN weighment_verification wv ON wv.indent_id = i.id
  LEFT JOIN qc qc ON qc.indent_id = i.id
  LEFT JOIN mrn mr ON mr.indent_id = i.id
  LEFT JOIN bill_submit bs ON bs.indent_id = i.id
  LEFT JOIN erp_entry erp ON erp.indent_id = i.id
  LEFT JOIN cancel c ON c.indent_id = i.id

  ORDER BY i.created_at DESC
`;



export const updateIndentItemQuery = `
  UPDATE indents
  SET
    po_number     = $1,
  supplier_name = $2,
  material_name = $3,
  quantity      = $4,
  unit          = $5,
  rate          = $6,
  delivery_date = $7
    WHERE id = $8
  RETURNING *
`;
