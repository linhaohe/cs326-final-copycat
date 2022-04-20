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
app.get('/timesheet/all', async (res, req) => {
    await ts.getAll(res, req);
});
app.get('/timesheet/add', async (res, req) => {
    await ts.getAdd(res, req);
});
app.get('/timesheet/delete', async (res, req) => {
    await ts.getDelete(res, req);
});
app.get('/timesheet/edit', async (res, req) => {
    await ts.getEdit(res, req);
});
app.get('/timesheet/export', async (res, req) => {
    await ts.getExport(res, req);
});
app.get('/timesheet/select', async (res, req) => {
    await ts.getSelect(res, req);
});
// End of TimeSheet endpoints

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
  