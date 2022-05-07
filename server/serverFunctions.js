import {actionTypes, actionIds} from './constant.js';
import {Database} from './dbFunctions.js';

const db = new Database(process.env.DATABASE_URL);
await db.connect();

async function createActivity(userEmail, actionType, table){
    const userId = await db.getUserId(userEmail);
    await db.createAction(userId, JSON.stringify(new Date()), actionType, actionIds[actionType], table);
}

export async function getActivityDatetimes(response, activityType, timeFrom, timeTo) {
    let activities = await db.readActions(activityType);
    if (activities === undefined) {
        response.status(404).send({"Status": "activity of type " + activityType + " not found!" });
        return;
    }
    let fromDate = new Date(timeFrom);
    let toDate = new Date(timeTo);
    let results = {'add': [], 'delete': [], 'edit': [], 'export': [], 'select': []};
    activities = activities.filter( elem => {
        let elemDate = new Date(JSON.parse(elem.date));
        return fromDate <=  elemDate && elemDate <= toDate ;
    });
    if (activityType !== 'all') {
        results[activityType] = activities.map(elem => new Date(JSON.parse(elem.date)));
        response.status(200).send(results);
        return;
    }
    activities.forEach( elem => {
        console.log(elem.action);
        results[elem.action].push(new Date(JSON.parse(elem.date)));
    });
    response.status(200).send(results);
}

export async function closeDB() {
    await db.close();
}


// export async function sliceMusicData(res, length) {
//     let musicData = await db.readAllMusicData();
//     res.status(200).send({name:"Music", data:musicData.slice(0, length)});
// }
export async function validateUser(data) {
    let user = await db.readUser(data.email);
    if (user && user.password === data.password) {
        return true;
    }
    else {
        return false;
    }
}

export async function createEntryForTable(res, userEmail, table, item) {
    try {
        item._id = parseInt(item.id);
        delete item.id;
        const result = await db.createTableEntry(table, item);
        await createActivity(userEmail, actionTypes.add, table);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res.status(404).send({'status': 'failure'});
    }
}

export async function readAllTableEntries(res, userEmail, limit) {
    try {
        let data = await db.readAllTablesAndEntriesWithLimit(limit);
        res.status(200).send(data);
    } catch (e) {
        console.log(e);
        res.status(404).send({'status': 'failure'});   
    }
}

export async function updateTableEntry(res, userEmail, table, from, to) {
    try {
        from._id = from.id;
        delete from.id;
        let result = await db.updateTableEntry(table, from, to);
        await createActivity(userEmail, actionTypes.edit, table);
        res.status(200).send({'status': 'success', 'result': result});   
    } catch (e) {
        console.log(e)
        res.status(404).send({'status': 'failure'});   
    }
}


export async function deleteTableEntryById(res, userEmail, table, id) {
    try {
        let result = await db.deleteTableEntryById(table, id);
        await createActivity(userEmail, actionTypes.delete, table);
        res.status(200).send({'status': 'success', 'result': result});   
    } catch (e) {
        console.log(e)
        res.status(404).send({'status': 'failure'});   
    }
}

// Timesheet server functions
export async function getTimesheetAll(req, res) {
    try {
        const data = await db.readActions(actionTypes.all);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data'});
    }
}

export async function getTimesheetAdd(req, res) {
    try {
        const data = await db.readActions(actionTypes.add);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getTimesheetDelete(req, res) {
    try {
        const data = await db.readActions(actionTypes.delete);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getTimesheetEdit(req, res) {
    try {
        const data = await db.readActions(actionTypes.edit);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getTimesheetExport(req, res) {
    try {
        const data = await db.readActions(actionTypes.export);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getTimesheetSelect(req, res) {
    try {
        const data = await db.readActions(actionTypes.select);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function signup(req, res) {
    const params = req.body;
    try {
        const data = await db.createUser(
            params.username,
            params.password,
            params.access_authority,
            params.date_created);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to create user' });
    }
}