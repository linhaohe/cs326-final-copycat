import express from 'express';
import logger from 'morgan';

import * as functions from './serverFunctions.js';
import * as ts from './timesheetUtils.js';

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
    await functions.getFakeActivityHistory(response, activityType, timeFrom, timeTo);
});

// app.use('/dashboard', express.static('page_skeleton/dashboard_page'));

// Init fake data
functions.initFakeData();

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

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
  