const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyControllers");
const verifyToken = require("../middleware/authMiddleware");

const upload = require("../utils/multer");

router.post(
  "/",
  verifyToken,
  upload.single("image"),
  propertyController.create_prop
);

router.patch(
  "/:id",
  verifyToken,
  upload.single("image"),
  propertyController.updateProperty
);

router.delete("/:id", verifyToken, propertyController.deleteProperty);

module.exports = router;
