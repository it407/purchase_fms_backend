import { getAllIssuePoService, updateIssuePoService } from "./services.js";
import { writeLog } from "../../utils/logger.js";

import { sendPOWhatsApp } from "../../utils/wati.js";
import db from "../../config/db.js";

/* CREATE */

/* GET ALL */
export const getAllIssuePo = async (req, res) => {
  try {
    const data = await getAllIssuePoService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const formatDateTime = (dateValue) => {
  const date = new Date(dateValue);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
};




export const updateIssuePo = async (req, res) => {
  console.log("🚀 updateIssuePo API HIT");

  // ✅ SSD IN (Frontend → Backend)
  writeLog("ssd_in.log", {
    api: "PUT /api/issue_po",
    body: req.body,
    file: req.file ? {
      original: req.file.originalname,
      savedAs: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    } : null
  });

  try {
    const {
      indent_id,
      issue_date,
      supplier_contact,
      mode_of_send,
    } = req.body;

    // const attachment = req.file ? req.file.path : null;
    const attachment = req.file?.path;


    // 1️⃣ Update issue_po DB
    const result = await updateIssuePoService({
      indent_id,
      issue_date,
      supplier_contact,
      mode_of_send,
      attachment,
    });

    // 2️⃣ Fetch indent data
    const indentResult = await db.query(`
      SELECT
        i.supplier_name,
        i.po_number,
        i.material_name,
        i.quantity,
        i.unit,
        i.delivery_date,
        ip.supplier_contact
      FROM indents i
      JOIN issue_po ip ON ip.indent_id = i.id
      WHERE i.id = $1
    `, [indent_id]);

    const indent = indentResult.rows[0];

    // 3️⃣ WhatsApp Flow
    if (mode_of_send === "WhatsApp") {

      // ✅ SSD OUT (Backend → External)
      writeLog("ssd_out.log", {
        action: "SEND_WHATSAPP",
        indent_id,
        phone: indent.supplier_contact
      });

      try {
        const watiRes = await sendPOWhatsApp({
          phone: indent.supplier_contact,
          supplier_name: indent.supplier_name,
          po_number: indent.po_number,
          material: indent.material_name,
          quantity: `${indent.quantity} ${indent.unit}`,
          // delivery_date: indent.delivery_date,
          delivery_date: formatDateTime(indent.delivery_date),

        });

        // ✅ Only after REAL success
        await db.query(`
          UPDATE issue_po
          SET whatsapp_status = 'SENT',
              whatsapp_sent_at = NOW()
          WHERE indent_id = $1
        `, [indent_id]);

      } catch (watiErr) {

        await db.query(`
          UPDATE issue_po
          SET whatsapp_status = 'FAILED'
          WHERE indent_id = $1
        `, [indent_id]);

        writeLog("error.log", {
          source: "WATI",
          error: watiErr.message
        });

        throw watiErr;
      }
    }

    res.json({
      success: true,
      message: "PO issued successfully",
      data: result,
    });

  } catch (error) {

    writeLog("error.log", {
      api: "PUT /api/issue_po",
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      message: "PO updated but WhatsApp failed",
      error: error.message,
    });
  }
};







