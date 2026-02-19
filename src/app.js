import express from "express";
import cors from "cors";

import indentRoutes from "./modules/indent/indent.routes.js";
import updateIssuePo from "./modules/issue-po/routes.js";
import updateFollowUp from "./modules/follow-up/routes.js";
import updateGateEntry from "./modules/gate-entry/routes.js";
import updateWeighmentVerification from "./modules/weighment-verification/routes.js";
import updateQC from "./modules/quality/routes.js";
import updateMRN from "./modules/mrn-genration/routes.js";
import updateSubmitBill from "./modules/submit-bill/routes.js";
import updateErpEntry from "./modules/bill-entry/routes.js";
import cancelStage from "./modules/cancel/routes.js";

import authRoutes from "./modules/auth/routes.js";

import login from "./modules/login/routes.js"

const app = express();

app.use(cors());

// JSON parsing (for non-file APIs)
app.use(express.json());

// ✅ Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/indents", indentRoutes);
app.use("/api/issue_po", updateIssuePo);
app.use("/api/follow_up", updateFollowUp);
app.use("/api/gate_entry", updateGateEntry);
app.use("/api/weighment_verification", updateWeighmentVerification);
app.use("/api/qc", updateQC);
app.use("/api/mrn", updateMRN);
app.use("/api/bill_submit", updateSubmitBill);
app.use("/api/erp_entry", updateErpEntry);
app.use("/api/cancel", cancelStage);


app.use("/api/create-user", authRoutes);
app.use("/api/auth", login);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});


export default app;
