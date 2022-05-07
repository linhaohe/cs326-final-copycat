import {actionTypes} from './constant.js';
import {Database} from './dbFunctions.js';

const db = new Database(process.env.DATABASE_URL);
await db.connect();

export async function getActivityDatetimes(response, activityType, timeFrom, timeTo) {
    let activities = await db.readActions(activityType);
    if (activities === undefined) {
        response.status(404).send({"Status": "activity of type " + activityType + " not found!" });
        return;
    }
    let fromDate = new Date(timeFrom);
    let toDate = new Date(timeTo);
    let results = {};
    activities = activities.filter( elem => {
        let elemDate = new Date(elem.date);
        return fromDate <=  elemDate && elemDate <= toDate ;
    });
    if (activityType !== 'all') {
        results[activityType] = activities.map(elem => new Date(elem.date));
        response.status(200).send(results);
        return;
    }
    results = {'add': [], 'delete': [], 'edit': [], 'export': [], 'select': []};
    activities.forEach( elem => {
        results[elem.action].push(new Date(elem.date));
    });
    response.status(200).send(results);
}

export async function createEntryForTable(res, table, item) {
    try {
        item._id = parseInt(item.id);
        delete item.id;
        const result = db.createTableEntry(table, item);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res.status(404).send({'status': 'failure'});
    }
}

export async function closeDB() {
    await db.close();
}

export async function readAllTableEntries(res, limit) {
    try {
        let data = await db.readAllTablesAndEntriesWithLimit(limit);
        res.status(200).send(data);
    } catch (e) {
        console.log(e);
        res.status(404).send({'status': 'failure'});   
    }
}

// export async function sliceMusicData(res, length) {
//     let musicData = await db.readAllMusicData();
//     res.status(200).send({name:"Music", data:musicData.slice(0, length)});
// }
export async function validateUser(data) {
    let user = await db.readUser(data.username);
    if (user && user.password === data.password) {
        return true;
    }
    else {
        return false;
    }
}

export async function updateTableEntry(res, table, from, to) {
    try {
        from._id = from.id;
        delete from.id;
        let result = await db.updateTableEntry(table, from, to);
        res.status(200).send({'status': 'success', 'result': result});   
    } catch (e) {
        console.log(e)
        res.status(404).send({'status': 'failure'});   
    }
}


export async function deleteTableEntryById(res, table, id) {
    try {
        let result = await db.deleteTableEntryById(table, id);
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