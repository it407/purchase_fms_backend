import {
  getAllFollowUpService,
  updateFollowUpService,
} from "./services.js";

/* CREATE */


/* GET ALL */
export const getAllFollowUp = async (req, res) => {
  try {
    const data = await getAllFollowUpService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* UPDATE */
/* UPDATE */
export const updateFollowUp = async (req, res) => {
  try {
    const data = await updateFollowUpService(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

