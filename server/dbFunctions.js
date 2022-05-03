// import {readFile, writeFile} from 'fs/promises';

// let fakeActivityData = [];
// let fakeActivityDataJSON = './data/fakeActivityData.json';

// let fakeMusicData = [];
// let fakeMusicDataJSON = './data/fakeMusicData.json';


// async function reloadActivityDB() {
//     try {
//         const data = await readFile(fakeActivityDataJSON, { encoding: 'utf8' });
//         fakeActivityData = JSON.parse(data);
//     } catch (err) {
//         console.log(err);
//         fakeActivityData = [];
//     }
// }

// async function saveActivityDB() {
//     try {
//         const data = JSON.stringify(fakeActivityData);
//         await writeFile(fakeActivityDataJSON, data, { encoding: 'utf8' });
//     } catch (err) {
//         console.log(err);
//     }
// }


// async function reloadMusicDB() {
//     try {
//         const data = await readFile(fakeMusicDataJSON, { encoding: 'utf8' });
//         fakeMusicData = JSON.parse(data);
//     } catch (err) {
//         console.log(err);
//         fakeMusicData = [];
//     }
// }

// async function saveMusicDB() {
//     try {
//         const data = JSON.stringify(fakeMusicData);
//         await writeFile(fakeMusicDataJSON, data, { encoding: 'utf8' });
//     } catch (err) {
//         console.log(err);
//     }
// }

// // Basic database abstraction
// export class Database {
//     constructor(dburl) {
//       this.dburl = dburl;
//     }

//     async connect() {
//     //   this.client = await MongoClient.connect(this.dburl, {
//     //     useNewUrlParser: true,
//     //     useUnifiedTopology: true,
//     //     serverApi: ServerApiVersion.v1,
//     //   });

//     //   // Get the database.
//     //   this.db = this.client.db('people');

//     //   // Init the database.
//     //   await this.init();
//     }

//     async init() {
//     //   this.collection = this.db.collection('people');

//     //   const count = await this.collection.countDocuments();

//     //   if (count === 0) {
//     //     await this.collection.insertMany([
//     //       { _id: '1', name: 'Artemis', age: 19 },
//     //       { _id: '2', name: 'Parzival', age: 17 },
//     //       { _id: '3', name: 'John', age: 30 },
//     //       { _id: '4', name: 'Mia', age: 22 },
//     //     ]);
//     //   }
//     }

//     // Close the pool.
//     async close() {
//     //   this.client.close();
//     }

//     // CREATE an activity instance in the database
//     async createAction(id, user_id, datetime, action, action_id) {
//         await reloadActivityDB();
//         // Create new id
//         if (id === 0) {
//             if (fakeActivityData.length === 0) {
//                 id = 1;
//             } else {
//                 id = fakeActivityData[fakeActivityData.length - 1].id + 1;
//             }
//         }
//         let newActivity = {
//             id: id,
//             user_id: user_id,
//             date: datetime,
//             action: action,
//             action_id: action_id
//         };
//         fakeActivityData.push(newActivity);
//         await saveActivityDB();
//         return newActivity;
//     }

//     // READ all actions of a given type from the database.
//     // Returns an array of JSONs of the given type, type 'all' will return all data in the db
//     async readActions(actionType) {
//         await reloadActivityDB();
//         if (actionType === 'all') {
//             return fakeActivityData;
//         }
//         // let results = {'add': [], 'delete': [], 'edit': [], 'export': [], 'select': []};
//         const results = fakeActivityData.filter( elem => {
//             return elem.action === actionType;
//         });

//         return results;
//     }

//     // Creates a new music entry
//     async createMusicEntry(song_name, artist, genre, date_created) {
//         await reloadMusicDB();
//         let id = 0;
//         if (fakeMusicData.length === 0) {
//             id = 1;
//         } else {
//             id = fakeMusicData[fakeMusicData.length - 1].id + 1;
//         }

//         let newMusic = {
//             id: id,
//             song_name: song_name,
//             artist: artist,
//             genre: genre,
//             date_created: date_created,
//         }
//         fakeMusicData.push(newMusic);
//         await saveMusicDB();
//         return newMusic;
//     }

//     // READ all music data from the database
//     async readAllMusicData() {
//         await reloadMusicDB();
//         return fakeMusicData;
//     }

//     // Updates a song's genre given the song name and artist
//     async updateMusicGenre(song_name, artist, genre) {
//         await reloadMusicDB();
//         let results = fakeMusicData.filter((elem) => {
//             return elem.song_name === song_name && elem.artist === artist;
//         });
//         results.forEach(elem => elem.genre = genre);
//         await saveMusicDB();
//         return results.length !== 0;
//     }


//     // Delete a song given the song name and artist
//     async deleteMusicEntry(song_name, artist) {
//         await reloadMusicDB();
//         let initialLength = fakeMusicData.length;
//         let results = fakeMusicData.filter((elem) => {
//             return elem.song_name !== song_name || elem.artist !== artist;
//         });
//         fakeMusicData = results;
//         await saveMusicDB();
//         return initialLength !== fakeMusicData.length;
//     }

//     // Delete a song given the song name and artist
//     async deleteMusicEntryById(id) {
//         await reloadMusicDB();
//         let initialLength = fakeMusicData.length;
//         let results = fakeMusicData.filter((elem) => {
//             return elem.id !== id;
//         });
//         fakeMusicData = results;
//         await saveMusicDB();
//         return initialLength !== fakeMusicData.length;
//     }

// }

import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';
import {actionTypes} from "./constant.js";

// Basic database abstraction
export class Database {
    constructor(dburl) {
        this.dburl = dburl;
    }

    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });

        // Get the database.
        this.db = this.client.db('database');

        // Init the database.
        await this.init();
    }

    async init() {
        let musicCollection = this.db.collection('Musics');
        let userCollection = this.db.collection('Users');
        let actionCollection = this.db.collection('Actions');

        this.collections = {
            'Musics': musicCollection,
            'Users': userCollection,
            'Actions': actionCollection
        };

        // Insert row titles
        this.rowHeaders = [];
        this.rowHeaders["Musics"] = {
            "id": "id", 
            "song_name": "song_name", 
            "artist": "artist", 
            "genre": "genre",
            "date_created": "date_created"
        };

        this.rowHeaders["Users"] = {
            "user_id": "user_id", 
            "username": "username", 
            "access_authority": "access_authority",
            "date_created": "date_created"
        };

        this.rowHeaders["Actions"] = {
            "id": "id",
            "action_id": "action_id",
            "action": "action",
            "table": "table",
            "user_id": "user_id",
            "date": "datetime"
        };
    }

    // Close the pool.
    async close() {
        this.client.close();
    }

    // CREATE an activity instance in the database
    async createAction(unusedID, user_id, datetime, action, action_id, table) {
        const count = await this.collections['Actions'].countDocuments();

        // Create new id
        let id = count + 1;

        let newActivity = {
            id: id,
            action: action,
            action_id: action_id,
            table: table,
            user_id: user_id,
            date: datetime,
        };
        await this.collections['Actions'].insertOne(newActivity);
        return newActivity;
    }

    // READ all actions of a given type from the database.
    // Returns an array of JSONs of the given type, type 'all' will return all data in the db
    async readActions(actionType) {
        if (actionType != actionTypes.all) {
            let results = await this.collections['Actions'].find({ actionType: actionType });
            return results;
        }
        let results = await this.collections['Actions'].find({});
        return results;
    }

    // CRUD actions for tables other than the actions table
    async createTableEntry(table, entry) {
        if (table === 'Actions') {
            // let res = await this.createAction(entry);
            // return res;
        }
        if (! table in this.collections) {
            return {"status": "failure"};
        }
        let res = this.collections[table].insertOne(entry);
        return res;
    }

    async readAllTablesAndEntries() {
        let results = [];
        Object.keys(this.collections).forEach( async tableName => {
            let tableData = Array(await this.collections[tableName].find({}));
            tableData.unshift(this.rowHeaders[tableName]);
            results.push({
                name: tableName,
                data: tableData,
            });
        });
        return results;
    }

    async readTableEntry(table) {
        if (! table in this.collections) {
            return {"status": "failure"};
        }
        let res = this.collections[table].find({});
        res.unshift(this.rowHeaders[table]);
        return {"status": "success", "data": res};
    }

    async readTableEntryByFilter(table, filter) {
        if (! table in this.collections) {
            return {"status": "failure"};
        }
        let res = this.collections[table].find(filter);
        res.unshift(this.rowHeaders[table]);
        return {"status": "success", "data": res};
    }

    async updateTableEntry(table, from, to) {
        if (! table in this.collections || table === 'Actions') {
            return {"status": "failure"};
        }
        let res = this.collections[table].update(from, to);
        return {"status": "success"};
    }

    async deleteTableEntryById(table, id) {
        if (! table in this.collections || table === 'Actions') {
            return {"status": "failure"};
        }
        let res = this.collections[table].delete({ id: id });
        return {"status": "success"};
    }

}
