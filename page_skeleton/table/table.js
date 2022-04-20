// import express from 'express';  
// import logger from 'morgan'; 
// import { readFile, writeFile } from 'fs/promises'; 
// import { appendFile } from 'fs';


const csvTable = 'fakeData.csv';

// CSV to JSON
async function tableData() {
    const response = await fetch(csvTable);
    const data = await response.text();
    const result = [];
    const table = data.split('\n');
    table.forEach(row => {
        const cols = row.split(',');
        const obj = {};
        cols.forEach((col, i) => {
            obj[i] = col;
        });
        result.push(obj);
    });
    return JSON.stringify(result);
}





// using POST to add input to the fakeData.csv file
async function addData(req, res) {
    try {
        const data = await tableData();
        const newData = JSON.parse(data);
        newData.push(req.body);
        await writeFile(csvTable, JSON.stringify(newData));
        res.send(newData);
    } catch (err) {
        console.log(err);
    }
}




// using DELETE to delete data from the fakeData.csv file
async function deleteData(req, res) {
    try{
        const data = await tableData();
        const newData = JSON.parse(data);
        newData.splice(req.params.id, 1);
        await writeFile(csvTable, JSON.stringify(newData));
        res.send(newData);
    } catch (err) {
        console.log(err);
    }
}




// using PUT to edit input in the fakeData.csv file
async function editData(req, res) {
    try{
        const data = await tableData();
        const newData = JSON.parse(data);
        newData[req.params.id] = req.body;
        await writeFile(csvTable, JSON.stringify(newData));
        res.send(newData);
    } catch (err) {
        console.log(err);
    }
}


// using GET to get data from the fakeData.csv file
async function getData(req, res) {
    try{
        const data = await tableData();
        const newData = JSON.parse(data);
        res.send(newData);
    } catch (err) {
        console.log(err);
    }
}




app.post('/addInput', async (req, res) => {
    await addData(req, res);
});


app.get('/getInput', async (req, res) => {
    await getData(req, res);
});


app.put('/editInput/:id', async (req, res) => {
    await editData(req, res);
});


app.delete('/deleteInput/:id', async (req, res) => {
    await deleteData(req, res);
});

