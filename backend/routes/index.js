const express = require('express');

const { AccountRouter } = require('./account');
const { UserRouter } = require('./user');

const router = express.Router()
router.use('/user',UserRouter)
router.use('/account',AccountRouter)
module.exports = {
    router
}