const headRow = document.querySelector(".head-row") 
const headCol = document.querySelector(".serialNo")
const body = document.querySelector(".body")


const rows =100;
const cols=10;

for(let i=0;i<cols;i++){
    const headCell = document.createElement("div")

    if(i===0){
        headRow.appendChild(headCell)
        continue;
    }

    //formCharCode
    headCell.innerText = String.fromCharCode(i+64);
    headCell.classList.add("col-head")
    headRow.appendChild(headCell) 
}


for(let i=0;i<rows;i++){
    const headColCell = document.createElement("div")
    headColCell.innerText = i+1;
    headColCell.classList.add("sno-cell")
    headCol.appendChild(headColCell)
}


//how many body cells would be inside body ie row * col
for(let row = 1;row<=rows;row++){
    const rowCells = document.createElement("div")
    rowCells.classList.add("row");
    for(let col = 0;col<cols; col++){
        const colCell = document.createElement("div");
        colCell.classList.add("cell")
        colCell.contentEditable=true;
        rowCells.appendChild(colCell)
    }
    body.appendChild(rowCells)
}