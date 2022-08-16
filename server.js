const express = require('express');
const moment = require("moment");
const app = express();

app.use(express.json());

const studentRouter = require('./routes/student');
app.use("/api/students", studentRouter);

app.listen(4000);