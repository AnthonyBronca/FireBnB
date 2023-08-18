"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const { User } = require('../../db/models');
const auth_1 = require("../../utils/auth");
const usersRouter = require('./users');
const sessionRouter = require('./session');
router.use(auth_1.restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});
router.get('/set-token-cookie', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    (0, auth_1.setTokenCookie)(res, user);
    return res.json({ user: user });
}));
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
});
router.get('/require-auth', auth_1.requireAuth, (req, res) => {
    return res.json(req.user);
});
module.exports = router;
//# sourceMappingURL=index.js.map