import {Database} from './dbFunctions.js';

const db = new Database("dburl-here");
await db.connect();

export async function getFakeActivityDatetimes(response, activityType, timeFrom, timeTo) {
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

export async function closeDB() {
    await db.close();
}
