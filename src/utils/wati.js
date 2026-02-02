

import axios from "axios";
import { writeLog } from "./logger.js";

export const sendPOWhatsApp = async (data) => {
  const phone = data.phone.replace(/\D/g, "");
  const formattedPhone = phone.startsWith("91") ? phone : `91${phone}`;

  const payload = {
    template_name: "zoff_po",
    broadcast_name: "PO_Issue",

    // 🔥 SAME AS GOOGLE SCRIPT
    parameters: [
      { name: "supplier_name", value: data.supplier_name },
      { name: "po_number", value: data.po_number },
      { name: "material_name", value: data.material },
      { name: "quantity", value: data.quantity },
      { name: "delivery_date", value: data.issue_date },
    ],
  };

  const url = `${process.env.WATI_BASE_URL}/api/v1/sendTemplateMessage?whatsappNumber=${formattedPhone}`;

  writeLog("wati.log", {
    step: "REQUEST",
    url,
    payload,
  });

  const res = await axios.post(url, payload, {
  headers: {
    Authorization: `Bearer ${process.env.WATI_API_KEY}`,
    "Content-Type": "application/json",
  },
});


  writeLog("wati.log", {
    step: "RESPONSE",
    status: res.status,
    data: res.data,
  });

  if (!res.data?.result) {
    throw new Error(res.data?.info || "WATI rejected message");
  }

  return res.data;
};
