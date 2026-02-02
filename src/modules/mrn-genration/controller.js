import {
  getAllMRNService,
  updateMRNService,
} from "./services.js";

export const getAllMRN = async (req, res) => {
  try {
    const data = await getAllMRNService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMRN = async (req, res) => {
  try {
    const data = await updateMRNService(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
