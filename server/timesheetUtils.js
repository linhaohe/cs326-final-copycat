import fs from 'fs';
import csv from 'async-csv';
import * as constant from './constant.js'

async function retrieveFakeData() {
    const stream = await fs.promises.readFile("./data/fakeData.csv", 'utf-8');
    const rows = await csv.parse(stream);
    return rows
}
const actions = constant.actions;

export async function getAll(req, res) {
    try {
        const data = await retrieveFakeData();
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getAdd(req, res) {
    try {
        let data = await retrieveFakeData();
        data = data.filter(e => e[3] === actions.add);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getDelete(req, res) {
    try {
        let data = await retrieveFakeData();
        data = data.filter(e => e[3] === actions.delete);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getEdit(req, res) {
    try {
        let data = await retrieveFakeData();
        data = data.filter(e => e[3] === actions.edit);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getExport(req, res) {
    try {
        let data = await retrieveFakeData();
        data = data.filter(e => e[3] === actions.export);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}

export async function getSelect(req, res) {
    try {
        let data = await retrieveFakeData();
        data = data.filter(e => e[3] === actions.select);
        res.status(200).json({ data: data });
    }
    catch(e) {
        console.log(e);
        res.status(404).json({ error: 'Failed to retrieve data' });
    }
}