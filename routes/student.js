const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student")

router.post("/", studentController.post);
//router.get('/createtable', studentController.createtable);

router.get("/", studentController.getAll);

router.post("/login", studentController.login);

router.get("/:studentId", studentController.getSingle)

router.put("/:studentId", studentController.updated)

router.delete("/:studentId", studentController.deleteStudent)

module.exports = router;