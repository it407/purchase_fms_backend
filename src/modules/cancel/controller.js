import {
  createCancelService,
  getAllCancelsService,
} from "./service.js";

/* CREATE */
export const createCancel = async (req, res) => {
  try {
    const { indentId } = req.params;
    const { remark, stage } = req.body;


    if (!remark) {
      return res.status(400).json({
        success: false,
        message: "Remark is required",
      });
    }

    const result = await createCancelService(indentId, remark , stage);

    res.status(201).json({
      success: true,
      message: "Indent cancelled successfully",
      data: result,
    });
  } catch (error) {
    console.error("Cancel controller error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* GET ALL */
export const getAllCancels = async (req, res) => {
  try {
    const data = await getAllCancelsService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
