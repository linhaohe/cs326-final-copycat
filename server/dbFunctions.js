import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';
import {actionTypes} from "./constant.js";
import { faker } from '@faker-js/faker';

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

        // Insert fake data if none exists
        if ((await musicCollection.countDocuments()) === 0) {
            for (let i = 0; i < 20; i++) {
                let data = {
                    "_id": i + 1,
                    "song_name": faker.random.word() + ' ' + faker.random.word(),
                    "artist": faker.name.firstName() + ' ' + faker.name.lastName(),
                    "genre": faker.music.genre(),
                    "date_created": faker.date.past(10).toISOString().split('T')[0],
                };
                musicCollection.insertOne(data);
            }
        }

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
            "password": "password",
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

    async createUser(username, password, access_authority, date_created) {
        const count = await this.collections['Users'].countDocuments();
        let id = count + 1;

        let newUser = {
            user_id: id,
            username: username,
            password: password,
            access_authority: access_authority ? access_authority : 'placeholder',
            date_created: date_created ? date_created : 'placeholder'
        }

        await this.collections['Users'].insertOne(newUser);
        return newUser;
    }

    async readUser(username) {
        let results = await this.collections['Users'].findOne({ username: username });
        return results;
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
            let results = await this.collections['Actions'].find({ actionType: actionType }).toArray();
            return results;
        }
        let results = await this.collections['Actions'].find({}).toArray();
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
        let results = await this.readAllTablesAndEntriesWithLimit(-1);
        return results;
    }

    async readAllTablesAndEntriesWithLimit(limit) {
        let result = [];
        for(let tableName in this.collections) {
            let tableData = await this.collections[tableName].find({}).toArray();
            tableData = tableData.sort((a, b) => a._id - b._id);
            if (limit >= 0) {
                tableData = tableData.slice(0, limit);
            }
            tableData.unshift(this.rowHeaders[tableName]);
            const table = {
                "name": tableName,
                "data": tableData
            };
            result.push(table);
        }
        return result;
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
