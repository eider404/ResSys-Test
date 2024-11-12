const express = require('express');
const router = express.Router();
const categoryRouter = require('./categoryRouter');
const userRouter = require('./userRouter');
const serviceRouter = require('./serviceRouter');
const paymentRouter = require('./paymentRouter');

router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/service", serviceRouter);
router.use("/payment", paymentRouter);

module.exports = router;
