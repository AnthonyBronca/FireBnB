import { NextFunction, Request, Response } from "express";
import { AuthReq, JwtPayload, RestoreResponseInterface } from "../typings/express";
import { AuthError } from "../errors/customErrors";

const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../config');
import User from "../db/models/user";
const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res:Response, safeUser:any) => {
  // Create the token.
  // const safeUser = {
  //   id: user.id,
  //   email: user.email,
  //   username: user.username,
  // };
  const token = jwt.sign(
    { data: safeUser },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "lax"
  });

  return token;
};

const restoreUser = (req:AuthReq, res:Response, next:NextFunction) => {
  // token parsed from cookies
  const { token } = req.cookies;

  req.user = null;

  return jwt.verify(token, secret, null, async (err:any, jwtPayload:JwtPayload) => {
    if (err) {

      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
        attributes: {
          include: ['email', 'createdAt', 'updatedAt']
        }
      });

    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

// If there is no current user, return an error
const requireAuth = function (req:AuthReq, _res:Response, next:NextFunction) {
  if (req.user) return next();

  const err = new AuthError('Authentication required');
  err.title = 'Authentication required';
  err.errors = { message: 'Authentication required' };
  err.status = 401;
  return next(err);
}

module.exports = { setTokenCookie, restoreUser, requireAuth };
