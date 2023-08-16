"use strict";
const router = require('express').Router();
const apiRouter = require('./api');
router.use('/api', apiRouter);
router.get("/api/csrf/restore", (req, res, next) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map