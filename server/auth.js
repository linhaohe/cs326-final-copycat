// import jwt from "jsonwebtoken";


// export function login(req, res) {
//     const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET;
//     const data = req.body;
//     const user = {
//         username: data.username,
//         password: data.password
//     };
//     try {
//         const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);
//         res.status(200).json({ accessToken: accessToken });
//     } catch(e) {
//         console.log(e);
//         res.status(404).json({ status: "Failed to login" });
//     }
// }

// export function authenticate(req, res, next) {
//     const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET;
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }


import passport from 'passport';
import passportLocal from 'passport-local';
import {Database} from './dbFunctions.js';
import * as functions from './serverFunctions.js';

const db = new Database(process.env.DATABASE_URL);
await db.connect();
const { Strategy } = passportLocal;

const strategy = new Strategy(async (username, password, done) => {
  if (!await db.readUser(username)) {
    return done(null, false, { message: 'Wrong username' });
  }
  if (!await functions.validateUser({username: username, password: password})) {
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { message: 'Wrong password' });
  }
  console.log()
  return done(null, username);
});

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((uid, done) => {
  done(null, uid);
});

export default {
  configure: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  },

  authenticate: (domain, where) => {
    return passport.authenticate(domain, where);
  },
};