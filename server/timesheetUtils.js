import * as constant from './constant.js';
import { Database } from './dbFunctions.js';

const actions = constant.actions;
const db = new Database();

export async function getAll(req, res) {
    try {
        const data = await db.readActions(actions.all);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getAdd(req, res) {
    try {
        const data = await db.readActions(actions.add);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getDelete(req, res) {
    try {
        const data = await db.readActions(actions.delete);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getEdit(req, res) {
    try {
        const data = await db.readActions(actions.edit);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getExport(req, res) {
    try {
        const data = await db.readActions(actions.export);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getSelect(req, res) {
    try {
        const data = await db.readActions(actions.select);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}