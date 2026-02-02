import {
  createIndentService,
  getAllIndentsService,
  updateIndentItemService,
} from "./indent.service.js";

// post
export const createIndent = async (req, res, next) => {
  try {
    /*
      req.body = payload from frontend
    */
    const result = await createIndentService(req.body);

    res.status(201).json({
      success: true,
      message: "Indent created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllIndents = async (req, res) => {
  try {
    const data = await getAllIndentsService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* UPDATE */
export const updateIndentItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateIndentItemService(id, req.body);

    res.json({
      success: true,
      message: "Indent updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};