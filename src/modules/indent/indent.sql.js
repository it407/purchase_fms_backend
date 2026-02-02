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
export const getAllIndentsQuery = `
  SELECT
    id,
    indent_number AS "indentNumber",
    product_number AS "productNumber",
    supplier_name AS "supplierName",
    po_number AS "poNumber",
    material_name AS "materialName",
    quantity,
    unit,
    rate,
    delivery_date AS "deliveryDate",
    qc_required AS "qcRequired",
    status,
    created_by AS "createdBy",
    created_at AS "createdAt"
  FROM indents
  ORDER BY created_at DESC
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
