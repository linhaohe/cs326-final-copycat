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

app.put('/account/[0-9]*/profile',(req,res) => {
    //update the database by user request
});

app.put('/account/[0-9]*/profileImage',(req,res) => {
    //update the profile Image in the database by user request
});

app.put('/account/[0-9]*/profilePassword',(req,res) => {
    //update the profile Password in the database by user request
});

app.listen(port, () => {
    console.log(`Server started on poart ${port}`);
});
