

const fakeData = [{name:"user", data: [{userId : "userId", Name:"userName", Email: "Email"},{userId : 1, Name:"This is a Name", Email: "happyboi@gmail.com"}]}];

const fetchMusic = async()=>{
    const result = await fetch("/readAllTables?limit=20",{
        method: "GET"
    }).then(res => {
        if(res.ok){
            return res.json();
        }
        throw new Error("Data not found");
    }).catch(err => {console.error(err)});

    return result;
}

const addRowToSchema = async(schema, data) =>{
    const result = await fetch(`/createTableEntry?table=${schema}`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(res => {
        if(res.ok){
            return res.json();
        }
        throw new Error("Data not found");
    }).catch(err => {console.error(err)});
}

const deleteFromSchema = async(schema, id) =>{

    await fetch(`/deleteTableEntry?table=${schema}`,{
        method: "DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({id:parseInt(id)})
    }).catch(err => console.error(err));
}

const tableName = document.getElementById("TableName");
const tableItem = document.getElementById("TableItem");
const tbl = document.getElementById('tbl');
const paramItem = document.getElementById("paramItem");

const deleteItem = document.getElementById("deleteItem");




function renderTableRow(table,headerData, renderType) {
    const tableRow = document.createElement('tr');

    for(let title in headerData){
        const tableHeader= document.createElement(renderType);
        tableHeader.innerHTML = `${headerData[title]}`;
        tableRow.appendChild(tableHeader);
    }
   
   table.appendChild(tableRow);
}

function renderAddParam(schema, headerData){
    paramItem.innerHTML = "";
    let inputBox = {};
    for(let title in headerData){
            const formGroup = document.createElement("div");
            formGroup.classList.add("form-group");
            const lable = document.createElement("label");
            lable.innerHTML = `${title}`;
            formGroup.appendChild(lable);
            const input = document.createElement("input");
            input.classList.add("form-control");
            inputBox[title] = input;
            formGroup.appendChild(input);
            paramItem.appendChild(formGroup);
    }

    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.innerHTML = "Submit";
    button.addEventListener('click', async(event) => {
        event.preventDefault();
        let obj = {};
        for(let item in inputBox){
            obj[item] = inputBox[item].value;
        }
        await addRowToSchema(schema, obj);
        await renderTableByClick();
        document.getElementById(schema).click();
        
    })

    paramItem.appendChild(button);


}

function renderDeleteParam(schema){
    deleteItem.innerHTML = "";
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");
    const lable = document.createElement("label");
    lable.innerHTML = "ID";
    formGroup.appendChild(lable);
    const input = document.createElement("input");
    input.classList.add("form-control");
    formGroup.appendChild(input);
    deleteItem.appendChild(formGroup);

    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.innerHTML = "Delete";

    button.addEventListener('click', async (event) => {
        event.preventDefault();
        await deleteFromSchema(schema, input.value);
        await renderTableByClick();
        document.getElementById(schema).click();
        
    })

    deleteItem.appendChild(button);


}


const renderTableByClick = async () =>{
    tableItem.innerHTML = "";
    const myData = await fetchMusic();
    // let myData = [];
    // myData.push(fetchMusicData);
    myData.forEach(data => {
        const tableSchema = document.createElement("div");
        tableSchema.classList.add("col");
        tableSchema.classList.add("px-2");
        tableSchema.classList.add("my-1");
        tableSchema.classList.add("tableName");
        tableSchema.id = `${data.name}`;
        tableSchema.innerHTML = `${data.name}`;
        
        tableSchema.addEventListener('click', () => {
            tbl.innerHTML = "";
            tableName.innerHTML = `${data.name}`;

            const tableData = data.data;

            tableData.forEach((cur,index) => {
                if(index === 0){
                    renderTableRow(tbl,cur,"th");
                    renderAddParam(data.name, cur);
                    renderDeleteParam(data.name);
                }else{
                    renderTableRow(tbl,cur,"td");
                }
            });
        });

        tableItem.appendChild(tableSchema);

    })

}

renderTableByClick();



const modal = document.getElementById("myModal");

const btn = document.getElementById("myBtn");

const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

const modalDelete = document.getElementById("myModalDelete");

const btnDelete = document.getElementById("myBtnDelete");

const spanDelete = document.getElementsByClassName("closeDelete")[0];

btnDelete.onclick = function () {
    modalDelete.style.display = "block";
}

spanDelete.onclick = function () {
    modalDelete.style.display = "none";
}
