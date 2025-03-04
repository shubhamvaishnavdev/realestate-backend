import express from "express";
const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Server is on and v1 is working!" });
});

export default router;
