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

function renderTable(data) {
    data = data.data;
    const tbl = document.getElementById('tbl');
    tbl.innerHTML = '';
    renderHeader(tbl);
    for (let i = 0; i < 10; i++) {
        renderRow(tbl, data[i]);
    }
}
async function getAllHelper() {
    let data = await getAll();
    renderTable(data);
}
document.getElementById('all').addEventListener('click', async () => {
    await getAllHelper();
});

async function getAddHelper() {
    let data = await getAdd();
    renderTable(data);
}
document.getElementById('add').addEventListener('click', async () => {
    await getAddHelper();
});

async function getDeleteHelper() {
    let data = await getDelete();
    renderTable(data);
}
document.getElementById('delete').addEventListener('click', async () => {
    await getDeleteHelper();
});

async function getEditHelper() {
    let data = await getEdit();
    renderTable(data);
}
document.getElementById('edit').addEventListener('click', async () => {
    await getEditHelper();
});

async function getExportHelper() {
    let data = await getExport();
    renderTable(data);
}
document.getElementById('export').addEventListener('click', async () => {
    await getExportHelper();
});

async function getSelectHelper() {
    let data = await getSelect();
    renderTable(data);
}
document.getElementById('select').addEventListener('click', async () => {
    await getSelectHelper();
});

// MODAL SECTION
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("filter");
var cancel = document.getElementById("cancel");
var apply = document.getElementById("apply");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}
cancel.onclick = function() {
    modal.style.display = "none";
}
apply.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const cmonth = document.getElementById("cmonth");
cmonth.onclick = function() {
    const now = new Date();
    const fmonth = document.getElementById("fmonth");
    const tmonth = document.getElementById("tmonth");

    fmonth.value = now.getMonth();
    tmonth.value = now.getMonth() + 1;
}

const today = document.getElementById("today");
today.onclick = function() {
    const now = new Date();
    const fday = document.getElementById("fday");
    const tday = document.getElementById("tday");

    fday.value = now.getDate() - 1;
    tday.value = now.getDate();
}

const lhour = document.getElementById("lhour");
lhour.onclick = function() {
    const now = new Date();
    const fhour = document.getElementById("fhour");
    const thour = document.getElementById("thour");

    fhour.value = now.getHours() - 1;
    thour.value = now.getHours();
}
// END MODAL SECTION

// TAB SECTION
let count = 0;
async function createTab(tagName) {
    const all = document.getElementById(tagName);
    const ts = document.getElementById("tab-section");
    all.onclick = function() {

        const outer = document.createElement("div");
        outer.classList.add("d-flex");
        outer.classList.add("flex-row");
        outer.classList.add("tab-width");

        const comp = document.createElement("span");
        comp.classList.add("tab");
        comp.classList.add("p-2");

        const name = tagName.split('');
        name[0] = name[0].toUpperCase();
        const text = document.createTextNode(name.join(''));
        comp.appendChild(text);

        comp.setAttribute('id', tagName+'_'+count);

        const cancel = document.createElement("span");
        cancel.classList.add("close-tab");
        cancel.classList.add("p-2");
        cancel.appendChild(document.createTextNode("x"));

        // Close tab
        cancel.onclick = function() {
            const close = document.getElementById(tagName+'_'+count);
            outer.outerHTML = '';

            const tbl = document.getElementById('tbl');
            tbl.innerHTML = '';
            renderHeader(tbl);
        }

        // Click on tab
        comp.onclick = async function() {
            switch (tagName) {
                case 'all':
                    await getAllHelper();
                    break;
                case 'add':
                    await getAddHelper();
                    break;
                case 'delete':
                    await getDeleteHelper();
                    break;
                case 'edit':
                    await getEditHelper();
                    break;
                case 'export':
                    await getExportHelper();
                    break;
                case 'select':
                    await getSelectHelper();
                    break;
                default:
                    await getAllHelper();
                    break;
            }
        }

        outer.appendChild(comp);
        outer.appendChild(cancel);
        ts.appendChild(outer);
    }
}
await createTab("all");
createTab("add");
createTab("delete");
createTab("edit");
createTab("export");
createTab("select");
// END TAB SECTION