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

export async function createSong(res, song_name, artist, genre, date_created) {
    const result = db.createMusicEntry(song_name, artist, genre, date_created);
    res.status(200).send(result);
}

export async function closeDB() {
    await db.close();
}

export async function sliceMusicData(res, length) {
    let musicData = await db.readAllMusicData();
    res.status(200).send({name:"Music", data:musicData.slice(0, length)});
}


export async function updateMusicData(res, song_name, artist, genre) {
    let genreData = await db.updateMusicGenre(song_name, artist, genre);
    if (genreData) {
        res.status(200).send(song_name + ' by ' + artist + ' genre updated to ' + genre);
    } else {
        res.status(404).send('Song not found');
    }
}


export async function deleteMusicData(res, song_name, artist) {
    let deleteData = await db.deleteMusicEntry(song_name, artist);
    if (deleteData) {
        res.status(200).send(song_name + ' by ' + artist + ' deleted');
    } else {
        res.status(404).send('Song not found');
    }
}

export async function deleteMusicDataById(res, id) {
    let deleteData = await db.deleteMusicEntryById(id);
    if (deleteData) {
        res.status(200).send('Song with id ' + id + ' deleted');
    } else {
        res.status(404).send('Song not found');
    }
}