import express from 'express';
import logger from 'morgan';

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
    await functions.getFakeActivityDatetimes(response, activityType, timeFrom, timeTo);
});

app.post('/signup', (req, res) => {
    functions.signup(req, res);
})
app.post('/login', (req, res) => {
    auth.login(req, res);
});

app.put('/account/[0-9]*/profile',(req,res) => {
    //update the database by user request
    res.status(200).send({"status":"success"});

});

// TimeSheet endpoinfunctions
app.get('/timesheet/all', async (req, res) => {
    await functions.getTimesheetAll(req, res);
});
app.get('/timesheet/add', async (req, res) => {
    await functions.getTimesheetAdd(req, res);
});
app.get('/timesheet/delete', async (req, res) => {
    await functions.getTimesheetDelete(req, res);
});
app.get('/timesheet/edit', async (req, res) => {
    await functions.getTimesheetEdit(req, res);
});
app.get('/timesheet/export', async (req, res) => {
    await functions.getTimesheetExport(req, res);
});
app.get('/timesheet/select', async (req, res) => {
    await functions.getTimesheetSelect(req, res);
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
    // await functions.sliceMusicData(res, limit);
    await functions.readAllTablesAndEntries(res, limit);
});

app.put('/UpdateTableEntry', async (req, res) => {
    const song_name = req.query.song_name;
    const artist = req.query.artist;
    const genre = req.query.genre;
    await functions.updateMusicData(res, song_name, artist, genre);
});

app.delete('/deleteTableEntry', async (req, res) => {
    const id = req.body.id;
    await functions.deleteMusicDataById(res, id);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
