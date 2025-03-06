import express from "express";
import { fetchPropertyList } from "../../controllers/v1/index.js";
const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Server is on and v1 is working!" });
});

router.get("/fetch",fetchPropertyList)

export default router;
