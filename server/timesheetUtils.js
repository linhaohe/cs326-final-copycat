import fs from 'fs';
import csv from 'csv-parser';

let data = [];
async function retrieveFakeData() {
    const stream = fs.createReadStream("./data/fakeData.csv");
    const results = [];
    stream
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
        data = results;
    });
}

export async function getAll(res, req) {
    retrieveFakeData();
}

export async function getAdd(res, req) {
    getAdd();
}

export async function getDelete(res, req) {

}

export async function getEdit(res, req) {

}

export async function getExport(res, req) {

}

export async function getSelect(res, req) {

}