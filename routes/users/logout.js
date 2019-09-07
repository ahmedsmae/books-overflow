const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../../database/models/user');

module.exports = router;
