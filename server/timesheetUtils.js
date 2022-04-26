// import * as constant from './constant.js';
// import { Database } from './dbFunctions.js';

// const actions = constant.actions;
// const db = new Database(process.env.DATABASE_URL);
// await db.connect();
// await db.init();

// export async function getTimesheetAll(req, res) {
//     try {
//         const data = await db.readActions(actions.all);
//         res.status(200).json({ data: data });
//     }
//     catch(e) {
//         console.log(e);
//         res.status(404).json({ error: 'Failed to retrieve data' });
//     }
// }

// export async function getTimesheetAdd(req, res) {
//     try {
//         const data = await db.readActions(actions.add);
//         res.status(200).json({ data: data });
//     }
//     catch(e) {
//         console.log(e);
//         res.status(404).json({ error: 'Failed to retrieve data' });
//     }
// }

// export async function getTimesheetDelete(req, res) {
//     try {
//         const data = await db.readActions(actions.delete);
//         res.status(200).json({ data: data });
//     }
//     catch(e) {
//         console.log(e);
//         res.status(404).json({ error: 'Failed to retrieve data' });
//     }
// }

// export async function getTimesheetEdit(req, res) {
//     try {
//         const data = await db.readActions(actions.edit);
//         res.status(200).json({ data: data });
//     }
//     catch(e) {
//         console.log(e);
//         res.status(404).json({ error: 'Failed to retrieve data' });
//     }
// }

// export async function getTimesheetExport(req, res) {
//     try {
//         const data = await db.readActions(actions.export);
//         res.status(200).json({ data: data });
//     }
//     catch(e) {
//         console.log(e);
//         res.status(404).json({ error: 'Failed to retrieve data' });
//     }
// }

// export async function getTimesheetSelect(req, res) {
//     try {
//         const data = await db.readActions(actions.select);
//         res.status(200).json({ data: data });
//     }
//     catch(e) {
//         console.log(e);
//         res.status(404).json({ error: 'Failed to retrieve data' });
//     }
// }