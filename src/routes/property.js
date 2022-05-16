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

router.get("/", propertyController.findAllProperty);

router.get("/search", propertyController.findPropertyByQuery);

router.get("/:id", propertyController.findProperty);

router.patch(
  "/:id",
  verifyToken,
  upload.single("image"),
  propertyController.updateProperty
);

router.delete("/:id", verifyToken, propertyController.deleteProperty);

router.patch("/:id/sold", verifyToken, propertyController.markAsSold);

module.exports = router;
