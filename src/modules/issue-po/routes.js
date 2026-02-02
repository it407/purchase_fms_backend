// import express from "express";
// import {
//   getAllIssuePo,
//   updateIssuePo,
// } from "./controller.js";
// import { uploadIssuePoAttachment } from "../../middleware/upload.js";


// const router = express.Router();

// router.get("/", getAllIssuePo);
// router.put(
//   "/",
//   uploadIssuePoAttachment.single("attachment"),
//   updateIssuePo
// );


// export default router;



import express from "express";
import {
  getAllIssuePo,
  updateIssuePo,
} from "./controller.js";

import {
  uploadIssuePoAttachment,
  uploadLogger
} from "../../middleware/upload.js";

const router = express.Router();

router.get("/", getAllIssuePo);

router.put(
  "/",
  uploadIssuePoAttachment.single("attachment"),
  uploadLogger,
  updateIssuePo
);

export default router;
