'use strict';

async function getAll() {
    try {
        const response = await fetch(`/timesheet/all`, {
          method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

async function getAdd() {
    try {
        const response = await fetch(`/timesheet/add`, {
          method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

async function getDelete() {
    try {
        const response = await fetch(`/timesheet/delete`, {
          method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

async function getEdit() {
    try {
        const response = await fetch(`/timesheet/edit`, {
          method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

async function getExport() {
    try {
        const response = await fetch(`/timesheet/export`, {
          method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

async function getSelect() {
    try {
        const response = await fetch(`/timesheet/select`, {
          method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

function renderHeader(tbl) {
    let row = document.createElement('tr');
    let cell = document.createElement('th');
    cell.innerText = "Action_Id";
    row.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = "Action_Type";
    row.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = "Table";
    row.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = "Admin_Id";
    row.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = "Element_Id";
    row.appendChild(cell);

    cell = document.createElement('th');
    cell.innerText = "Time";
    row.appendChild(cell);

    tbl.appendChild(row);
}

function renderRow(tbl, data) {
    const row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.innerText = data.action_id;
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerText = data.action;
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerText = '\"place holder\"';
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerText = data.user_id;
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerText = data.id;
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerText = data.date;
    row.appendChild(cell);

    tbl.appendChild(row);
}

document.getElementById('all').addEventListener('click', async () => {
    let data = await getAll();
    data = data.data;
    const tbl = document.getElementById('tbl');
    tbl.innerHTML = '';
    renderHeader(tbl);
    // TODO: Add Pagination
    for (let i = 0; i < 10; i++) {
        renderRow(tbl, data[i]);
    }
});

document.getElementById('add').addEventListener('click', async () => {
    let data = await getAdd();
    data = data.data;
    const tbl = document.getElementById('tbl');
    tbl.innerHTML = '';
    renderHeader(tbl);
    // TODO: Add Pagination
    for (let i = 0; i < 10; i++) {
        renderRow(tbl, data[i]);
    }
});

document.getElementById('delete').addEventListener('click', async () => {
    let data = await getDelete();
    data = data.data;
    const tbl = document.getElementById('tbl');
    tbl.innerHTML = '';
    renderHeader(tbl);
    // TODO: Add Pagination
    for (let i = 0; i < 10; i++) {
        renderRow(tbl, data[i]);
    }
});

document.getElementById('edit').addEventListener('click', async () => {
    let data = await getEdit();
    data = data.data;
    const tbl = document.getElementById('tbl');
    tbl.innerHTML = '';
    renderHeader(tbl);
    // TODO: Add Pagination
    for (let i = 0; i < 10; i++) {
        renderRow(tbl, data[i]);
    }
});

document.getElementById('export').addEventListener('click', async () => {
    let data = await getExport();
    data = data.data;
    const tbl = document.getElementById('tbl');
    tbl.innerHTML = '';
    renderHeader(tbl);
    // TODO: Add Pagination
    for (let i = 0; i < 10; i++) {
        renderRow(tbl, data[i]);
    }
});

document.getElementById('select').addEventListener('click', async () => {
    let data = await getSelect();
    data = data.data;
    const tbl = document.getElementById('tbl');
    tbl.innerHTML = '';
    renderHeader(tbl);
    // TODO: Add Pagination
    for (let i = 0; i < 10; i++) {
        renderRow(tbl, data[i]);
    }
});