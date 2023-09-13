"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const auth_1 = require("../../utils/auth");
const { User } = require('../../db/models');
const users_1 = __importDefault(require("../api/users"));
const session_1 = __importDefault(require("../api/session"));
const spots_1 = __importDefault(require("../api/spots"));
const router = require('express').Router();
router.use(auth_1.restoreUser);
router.use('/session', session_1.default);
router.use('/users', users_1.default);
router.use('/spots', spots_1.default);
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
});
module.exports = router;
//# sourceMappingURL=index.js.map