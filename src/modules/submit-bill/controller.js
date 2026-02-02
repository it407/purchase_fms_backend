import {
  getAllSubmitBillService,
  updateSubmitBillService,
} from "./services.js";

/* GET ALL */
export const getAllSubmitBill = async (req, res) => {
  try {
    const data = await getAllSubmitBillService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* UPDATE */
export const updateSubmitBill = async (req, res) => {
  try {
    const data = await updateSubmitBillService(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
