import express from 'express';
import logger from 'morgan';

import * as functions from './serverFunctions.js';
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
app.get('/authenticate', auth.authenticate, (req, res) => {
    console.log(req.user);
    res.status(200).send(req.user);
});

app.put('/account/[0-9]*/profile',(req,res) => {
    //update the database by user request
    res.status(200).send({"status":"success"});

});

app.post('/createMusicEntry', async (req, res) => {
    // Creates a music entry
    const song_name = req.body.song_name;
    const artist = req.body.artist;
    const genre = req.body.genre;
    const date_created = req.body.date_created;
    await functions.createSong(res, song_name, artist, genre, date_created);
});

// TimeSheet endpoinfunctions
// TODO: Add Pagination for all endpoinfunctions
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


app.get('/music', async (req, res) => {
    const limit = req.query.limit;
    await functions.sliceMusicData(res, limit);
});

app.put('/music/update', async (req, res) => {
    const song_name = req.query.song_name;
    const artist = req.query.artist;
    const genre = req.query.genre;
    await functions.updateMusicData(res, song_name, artist, genre);
});

app.delete('/music/delete', async (req, res) => {
    // const song_name = req.query.song_name;
    // const artist = req.query.artist;
    // await functions.deleteMusicData(res, song_name, artist);
    const id = req.body.id;
    await functions.deleteMusicDataById(res, id);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
