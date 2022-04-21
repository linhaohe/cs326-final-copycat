import express from 'express';
import logger from 'morgan';

import * as functions from './serverFunctions.js';
import * as ts from './timesheetUtils.js';
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
    auth.signup(req, res);
})
app.post('/login', (req, res) => {
    auth.login(req, res);
});

app.put('/account/[0-9]*/profile',(req,res) => {
    //update the database by user request
    res.status(200).send({"status":"success"});

});

app.post('/createMusicEntry', (req, res) => {
    // Creates a music entry
    const song_name = req.body.song_name;
    const artist = req.body.artist;
    const genre = req.body.genre;
    const date_created = req.body.date_created;
    await(res, song_name, artist, genre, date_created);
});

// TimeSheet endpoints
// TODO: Add Pagination for all endpoints
app.get('/timesheet/all', async (req, res) => {
    await ts.getAll(req, res);
});
app.get('/timesheet/add', async (req, res) => {
    await ts.getAdd(req, res);
});
app.get('/timesheet/delete', async (req, res) => {
    await ts.getDelete(req, res);
});
app.get('/timesheet/edit', async (req, res) => {
    await ts.getEdit(req, res);
});
app.get('/timesheet/export', async (req, res) => {
    await ts.getExport(req, res);
});
app.get('/timesheet/select', async (req, res) => {
    await ts.getSelect(req, res);
});
// End of TimeSheet endpoints
app.put('/account/[0-9]*/profileImage',(req,res) => {
    //update profile Image the database by user request
    res.status(200).send({"status":"success"});
});

app.put('/account/[0-9]*/profilePassword',(req,res) => {
    //update profile Image the database by user request
    res.status(200).send({"status":"success"});

});


app.get('/music/limit', async (req, res) => {
    const limit = req.query.limit;
    await functions.sliceMusicData(res, limit);
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
