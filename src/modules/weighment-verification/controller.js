import {
  getAllWeighmentVerificationService,
  updateWeighmentVerificationService,
} from "./services.js";

/* GET ALL */
export const getAllWeighmentVerification = async (req, res) => {
  try {
    const data = await getAllWeighmentVerificationService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const updateWeighmentVerification = async (req, res) => {
  try {
    const {
      id,
      gross_weight,
      tare_weight,
      verified_by,
    } = req.body;

    const attachmentPath = req.file
      ? `uploads/issue_po/${req.file.filename}`
      : null;

    const data = await updateWeighmentVerificationService({
      id,
      gross_weight,
      tare_weight,
      verified_by,
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
