const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createEnquiry, updateEnquiry, getallEnquiry, getEnquiry, deleteEnquiry } = require("../controller/enqCtrl.js");
const router = express.Router();

// POST
router.post("/", createEnquiry);

// PUT 
router.put("/update-enquiry/:id", authMiddleware, isAdmin, updateEnquiry);

// GET
router.get("/all-enquiry", getallEnquiry);
router.get("/:id", getEnquiry);

// DELETE
router.delete("/delete-enquiry/:id", authMiddleware, isAdmin, deleteEnquiry);



module.exports = router;