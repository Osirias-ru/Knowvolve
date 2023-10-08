const express = require('express');
const loginRouter = require('@routes/api/auth/user/login');
const registrationRouter = require('@routes/api/auth/user/registration');
const verefyRouter = require('@routes/api/auth/user/verify');

const router = express.Router();

const usertRouters = [loginRouter, registrationRouter, verefyRouter]

router.use("/user", usertRouters)

module.exports = router;