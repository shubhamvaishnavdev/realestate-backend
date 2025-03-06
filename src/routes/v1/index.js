import express from "express";
const router = express.Router();
import propertyRoutes from "./property.route.js";

// Test route
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Server is on and v1 is working!" });
});

router.use("/property", propertyRoutes);

export default router;
