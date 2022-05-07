import express from 'express';
import logger from 'morgan';
import auth from './auth.js';
import expressSession from 'express-session';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import * as functions from './serverFunctions.js';
// import * as tm from './timesheetUtils.js';
// import * as auth from './auth.js';


// We will use __dirname later on to send files back to the client.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));


const sessionConfig = {
    // set this encryption key in Heroku config (never in GitHub)!
    secret: process.env.ACCESS_TOKEN_SECRET || 'SECRET',
    resave: false,
    saveUninitialized: false,
};

const app = express();
const port = process.env.PORT || 3000;
app.use(expressSession(sessionConfig));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/page_skeleton', express.static('page_skeleton'));
app.use('/', express.static('public'));

auth.configure(app);

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      // If we are authenticated, run the next route.
      next();
    } else {
      // Otherwise, redirect to the login page.
      res.redirect('/');
    }
}

app.get('/dashboard', checkLoggedIn, (req, res) => {
    res.sendFile("private/dashboard.html", { root: __dirname });
});
app.get('/table', checkLoggedIn, (req, res) => {
    res.sendFile("private/table.html", { root: __dirname });
});
app.get('/timesheet', checkLoggedIn, (req, res) => {
    res.sendFile("private/timesheet.html", { root: __dirname });
});
app.get('/setting', checkLoggedIn, (req, res) => {
    res.sendFile("private/setting.html", { root: __dirname });
});

app.post(
    '/login',
    auth.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
    })
);

app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/'); // back to login
  });

app.get('/activities', checkLoggedIn, async (request, response) => {
    const query = request.query;
    const activityType = query.activityType;
    const timeFrom = JSON.parse(query.timeFrom);
    const timeTo = JSON.parse(query.timeTo);
    await functions.getActivityDatetimes(response, activityType, timeFrom, timeTo);
});

app.post('/signup', (req, res) => {
    functions.signup(req, res);
});

// app.post('/login', async (req, res) => {
//     const data = req.body;
//     if (await functions.validateUser(data)) {
//         auth.login(req, res);
//     }
//     else {
//         res.status(401).send({"error": "unauthorized"});
//     }
// });

app.put('/account/[0-9]*/profile', checkLoggedIn,(req,res) => {
    //update the database by user request
    res.status(200).send({"status":"success"});

});

// TimeSheet endpoinfunctions
app.get('/timesheet/all', checkLoggedIn, async (req, res) => {
    await functions.getTimesheetAll(req, res);
});
app.get('/timesheet/add', checkLoggedIn, async (req, res) => {
    await functions.getTimesheetAdd(req, res);
});
app.get('/timesheet/delete', checkLoggedIn, async (req, res) => {
    await functions.getTimesheetDelete(req, res);
});
app.get('/timesheet/edit', checkLoggedIn, async (req, res) => {
    await functions.getTimesheetEdit(req, res);
});
app.get('/timesheet/export', checkLoggedIn, async (req, res) => {
    await functions.getTimesheetExport(req, res);
});
app.get('/timesheet/select', checkLoggedIn, async (req, res) => {
    await functions.getTimesheetSelect(req, res);
});
// End of TimeSheet endpoinfunctions
app.put('/account/[0-9]*/profileImage', checkLoggedIn,(req,res) => {
    //update profile Image the database by user request
    res.status(200).send({"status":"success"});
});

app.put('/account/[0-9]*/profilePassword', checkLoggedIn,(req,res) => {
    //update profile Image the database by user request
    res.status(200).send({"status":"success"});

});


app.post('/createTableEntry', checkLoggedIn, async (req, res) => {
    // Creates a music entry
    const table = req.query.table;
    await functions.createEntryForTable(res, req.user, table, req.body);
});

app.get('/readAllTables', checkLoggedIn, async (req, res) => {
    const limit = req.query.limit;
    await functions.readAllTableEntries(res, req.user, limit);
});

app.put('/updateTableEntry', checkLoggedIn, async (req, res) => {
    const table = req.query.table;
    await functions.updateTableEntry(res, req.user, table, req.body.from, req.body.to);
});

app.delete('/deleteTableEntry', checkLoggedIn, async (req, res) => {
    const table = req.query.table;
    const id = req.body.id;
    await functions.deleteTableEntryById(res, req.user, table, id);
});

app.get('/*', checkLoggedIn, (req, res) =>
    res.redirect('/dashboard')
);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
