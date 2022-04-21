

const fakeData = [{name:"user", data: [{userId : "userId", Name:"userName", Email: "Email"},{userId : 1, Name:"This is a Name", Email: "happyboi@gmail.com"}]}];

const fetchMusic = async()=>{
    const result = await fetch("/music?limit=20",{
        method: "GET"
    }).then(res => {
        if(res.ok){
            return res.json();
        }
        throw new Error("Data not found");
    }).catch(err => {console.error(err)});

    return result;
}

const addRowToSchema = async(data) =>{
    const result = await fetch(`/createMusicEntry`,{
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

const tableName = document.getElementById("TableName");
const tableItem = document.getElementById("TableItem");
const tbl = document.getElementById('tbl');
const paramItem = document.getElementById("paramItem");




function renderTableRow(table,headerData, renderType) {
    const tableRow = document.createElement('tr');

    for(let title in headerData){
        const tableHeader= document.createElement(renderType);
        tableHeader.innerHTML = `${headerData[title]}`;
        tableRow.appendChild(tableHeader);
    }
   
   table.appendChild(tableRow);
}

function renderAddParam(headerData){
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
        await addRowToSchema(obj);
        
    })

    paramItem.appendChild(button);


}



const renderTableByClick = async () =>{
    tableItem.innerHTML = "";
    const fetchMusicData = await fetchMusic();
    let myData = [];
    myData.push(fetchMusicData);
    myData.forEach(data => {
        const tableSechma = document.createElement("div");
        tableSechma.classList.add("col");
        tableSechma.classList.add("px-2");
        tableSechma.classList.add("my-1");
        tableSechma.innerHTML = `${data.name}`;
        
        tableSechma.addEventListener('click', () => {
            tbl.innerHTML = "";
            tableName.innerHTML = `${data.name}`;

            const tableData = data.data;

            tableData.forEach((cur,index) => {
                if(index === 0){
                    renderTableRow(tbl,cur,"th");
                    renderAddParam(cur);
                }else{
                    renderTableRow(tbl,cur,"td");
                }
            });
        });

        tableItem.appendChild(tableSechma);

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
