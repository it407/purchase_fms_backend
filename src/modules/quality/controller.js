import {
  getAllQCService,
  updateQCService,
} from "./services.js";


export const getAllQC = async (req, res) => {
  try {
    const data = await getAllQCService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateQC = async (req, res) => {
  try {
    const data = await updateQCService(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
