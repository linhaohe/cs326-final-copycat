import express from 'express';
import logger from 'morgan';
import { authenticate } from './auth.js';

import * as functions from './serverFunctions.js';
// import * as tm from './timesheetUtils.js';
import * as auth from './auth.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('page_skeleton'));

app.get('/activities', async (request, response) => {
    const query = request.query;
    const activityType = query.activityType;
    const timeFrom = JSON.parse(query.timeFrom);
    const timeTo = JSON.parse(query.timeTo);
    await functions.getActivityDatetimes(response, activityType, timeFrom, timeTo);
});

app.post('/signup', (req, res) => {
    functions.signup(req, res);
});
app.post('/login', async (req, res) => {
    const data = req.body;
    if (await functions.validateUser(data)) {
        auth.login(req, res);
    }
    else {
        res.status(401).send({"error": "unauthorized"});
    }
});

app.put('/account/[0-9]*/profile',(req,res) => {
    //update the database by user request
    res.status(200).send({"status":"success"});

});

// TimeSheet endpoinfunctions
app.get('/timesheet/all', authenticate, async (req, res) => {
    if (await functions.validateUser(req.user)) {
        await functions.getTimesheetAll(req, res);
    }
    else {
        res.status(401).send({"error": "unauthorized"});
    }
});
app.get('/timesheet/add', authenticate, async (req, res) => {
    if (await functions.validateUser(req.user)) {
        await functions.getTimesheetAdd(req, res);
    }
    else {
        res.status(401).send({"error": "unauthorized"});
    }
});
app.get('/timesheet/delete', authenticate, async (req, res) => {
    if (await functions.validateUser(req.user)) {
        await functions.getTimesheetDelete(req, res);
    }
    else {
        res.status(401).send({"error": "unauthorized"});
    }
});
app.get('/timesheet/edit', authenticate, async (req, res) => {
    if (await functions.validateUser(req.user)) {
        await functions.getTimesheetEdit(req, res);
    }
    else {
        res.status(401).send({"error": "unauthorized"});
    }
});
app.get('/timesheet/export', authenticate, async (req, res) => {
    if (await functions.validateUser(req.user)) {
        await functions.getTimesheetExport(req, res);
    }
    else {
        res.status(401).send({"error": "unauthorized"});
    }
});
app.get('/timesheet/select', authenticate, async (req, res) => {
    if (await functions.validateUser(req.user)) {
        await functions.getTimesheetSelect(req, res);
    }
    else {
        res.status(401).send({"error": "unauthorized"});
    }
});
// End of TimeSheet endpoinfunctions
app.put('/account/[0-9]*/profileImage',(req,res) => {
    //update profile Image the database by user request
    res.status(200).send({"status":"success"});
});

app.put('/account/[0-9]*/profilePassword',(req,res) => {
    //update profile Image the database by user request
    res.status(200).send({"status":"success"});

});


app.post('/createTableEntry', async (req, res) => {
    // Creates a music entry
    const table = req.query.table;
    await functions.createEntryForTable(res, table, req.body);
});

app.get('/readAllTables', async (req, res) => {
    const limit = req.query.limit;
    await functions.readAllTableEntries(res, limit);
});

app.put('/updateTableEntry', async (req, res) => {
    const table = req.query.table;
    await functions.updateTableEntry(res, table, req.body.from, req.body.to);
});

app.delete('/deleteTableEntry', async (req, res) => {
    const table = req.query.table;
    const id = req.body.id;
    await functions.deleteTableEntryById(res, table, id);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
