import {
  getAllGateEntryService,
  updateGateEntryService,
} from "./services.js";

/* GET ALL */
export const getAllGateEntry = async (req, res) => {
  try {
    const data = await getAllGateEntryService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* UPDATE */
// export const updateGateEntry = async (req, res) => {
//   try {
//     const data = await updateGateEntryService(req.body);
//     res.json({ success: true, data });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


export const updateGateEntry = async (req, res) => {
  try {
    const { gate_entry_id, vehicle_no, driver_name } = req.body;

    const attachmentPath = req.file
      ? `uploads/issue_po/${req.file.filename}`
      : null;

    const data = await updateGateEntryService({
      gate_entry_id,
      vehicle_no,
      driver_name,
      attachment: attachmentPath,
    });

    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
