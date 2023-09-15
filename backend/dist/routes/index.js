"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const router = require('express').Router();
const api_1 = __importDefault(require("./api"));
router.use('/api', api_1.default);
router.get("/api/csrf/restore", (req, res, next) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map