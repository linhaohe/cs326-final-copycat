import {readFile, writeFile} from 'fs/promises'; 

let fakeActivityData = [];
let fakeActivityDataJSON = './data/fakeActivityData.json';

async function reloadActivityDB() {
    try {
        const data = await readFile(fakeActivityDataJSON, { encoding: 'utf8' });
        fakeActivityData = JSON.parse(data);
    } catch (err) {
        console.log(err);
        fakeActivityData = [];
    }
}

async function saveActivityDB() {
    try {
        const data = JSON.stringify(counters);
        await writeFile(fakeActivityDataJSON, data, { encoding: 'utf8' });
    } catch (err) {
        console.log(err);
    }
}

// Basic database abstraction
export class Database {
    constructor(dburl) {
      this.dburl = dburl;
    }
  
    async connect() {
    //   this.client = await MongoClient.connect(this.dburl, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     serverApi: ServerApiVersion.v1,
    //   });
  
    //   // Get the database.
    //   this.db = this.client.db('people');
  
    //   // Init the database.
    //   await this.init();
    }
    
    async init() {
    //   this.collection = this.db.collection('people');
  
    //   const count = await this.collection.countDocuments();
  
    //   if (count === 0) {
    //     await this.collection.insertMany([
    //       { _id: '1', name: 'Artemis', age: 19 },
    //       { _id: '2', name: 'Parzival', age: 17 },
    //       { _id: '3', name: 'John', age: 30 },
    //       { _id: '4', name: 'Mia', age: 22 },
    //     ]);
    //   }
    }
  
    // Close the pool.
    async close() {
    //   this.client.close();
    }
  
    // CREATE an activity instance in the database
    async createAction(id, user_id, datetime, action, action_id) {
        await reloadActivityDB();
        // Create new id
        if (id === 0) {
            if (fakeActivityData.length === 0) {
                id = 1;
            } else {
                id = fakeActivityData[fakeActivityData.length - 1].id + 1;
            }
        }
        let newActivity = {
            id: id,
            user_id: user_id,
            date: datetime,
            action: action,
            action_id: action_id
        };
        fakeActivityData.push(newActivity);
        await saveActivityDB();
        return newActivity;
    }
  
    // READ all actions of a given type from the database.
    // Returns an array of JSONs of the given type, type 'all' will return all data in the db
    async readActions(actionType) {
        await reloadActivityDB();
        if (actionType === 'all') {
            return fakeActivityData;
        }
        // let results = {'add': [], 'delete': [], 'edit': [], 'export': [], 'select': []};
        const results = fakeActivityData.filter( elem => {
            return elem.action === actionType;
        });

        return results;
    }
}
