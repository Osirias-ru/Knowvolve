const express = require('express');
const recoverRouter = require('@routes/api/auth/password/recover');
const resetRouter = require('@root/routes/api/auth/password/reset')

const router = express.Router();

const passwordRouters = [recoverRouter, resetRouter]

router.use("/password", passwordRouters)

module.exports = router;