import {
  getAllErpEntryService,
  updateErpEntryService,
} from "./services.js";

/* GET ALL */
export const getAllErpEntry = async (req, res) => {
  try {
    const data = await getAllErpEntryService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateErpEntry = async (req, res) => {
  try {
    const data = await updateErpEntryService(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

