const express = require('express');
const router = express.Router();
const categoryRouter = require('./categoryRouter');
const userRouter = require('./userRouter');

router.use("/category", categoryRouter);
router.use("/user", userRouter);

module.exports = router;
