let row = 100;
let col = 26;

const headRow = document.querySelector('.head-row');
const expressionInput = document.querySelector('#expression');
const snoCol = document.querySelector('.serial-no');
const body = document.querySelector('.body');
let selectedCell = "";
let activeCellElement = document.querySelector('.selected-cell');
const form = document.querySelector('#options-form');

// State to store cell formatting and content
let state = {};
let defaultState = {
    fontFamily: "Arial",
    fontSize: "14",
    isBold: false,
    isItalic: false,
    isUnderlined: false,
    align: "left",
    textColor: "#000000",
    backGroundColor: "#FFFFFF",
    content: ""
};

// Apply cell state to form when a cell is selected
function applyCellInfoToForm() {
    if (!selectedCell) return;

    const cellState = state[selectedCell.id] || defaultState;

    form["fontFamily"].value = cellState.fontFamily;
    form["fontSize"].value = cellState.fontSize;
    form["isBold"].checked = cellState.isBold;
    form["isItalic"].checked = cellState.isItalic;
    form["isUnderlined"].checked = cellState.isUnderlined;
    document.querySelector(`input[name="alignment"][value="${cellState.align}"]`).checked = true;
    form["textColor"].value = cellState.textColor;
    form["backGroundColour"].value = cellState.backGroundColor;
    expressionInput.value = cellState.content;
}

// Initialize column headers (A-Z)
for (let i = 0; i < col; i++) {
    let headCell = document.createElement('div');
    if (i == 0) {
        headRow.appendChild(headCell);
        continue;
    }
    headCell.innerText = String.fromCharCode(i + 64);  // A, B, C, etc.
    headCell.classList.add('col-head');
    headRow.appendChild(headCell);
}

// Initialize row numbers (1-100)
for (let i = 0; i < row; i++) {
    let headCell = document.createElement('div');
    headCell.innerText = i + 1;
    headCell.classList.add('sno-col');
    snoCol.appendChild(headCell);
}

// Create the grid body (editable cells)
for (let i = 1; i <= row; i++) {
    let rowCell = document.createElement('div');
    rowCell.classList.add('row');

    for (let j = 1; j <= col; j++) {
        let colCell = document.createElement('span');
        colCell.classList.add('cell');
        colCell.contentEditable = true;
        colCell.id = `${String.fromCharCode(j + 64)}${i}`;
        rowCell.appendChild(colCell);
    }

    body.appendChild(rowCell);
}

// Handle cell selection and update form
body.addEventListener('click', (e) => {
    if (selectedCell) {
        selectedCell.classList.remove("active-cell");
    }
    selectedCell = e.target;
    selectedCell.classList.add("active-cell");
    activeCellElement.innerText = selectedCell.id;
    applyCellInfoToForm();  // Apply cell data to the form
});

// Update cell formatting based on form changes
form.addEventListener('change', () => {
    if (!selectedCell) {
        alert("Please select a cell");
        return;
    }

    const alignmentOptions = form.querySelectorAll('input[name="alignment"]');
    let selectedAlignment;
    for (const option of alignmentOptions) {
        if (option.checked) {
            selectedAlignment = option.value;
            break;
        }
    }

    const formData = {
        fontFamily: form["fontFamily"].value,
        fontSize: form["fontSize"].value,
        isBold: form["isBold"].checked,
        isItalic: form["isItalic"].checked,
        isUnderlined: form["isUnderlined"].checked,
        align: selectedAlignment,
        textColor: form["textColor"].value,
        backGroundColor: form["backGroundColour"].value,
        content: selectedCell.innerText  // Store the cell's content as well
    };

    // Save the cell's formatting and content in state
    state[selectedCell.id] = formData;

    // Apply styles to the selected cell
    selectedCell.style.fontFamily = formData.fontFamily;
    selectedCell.style.fontSize = formData.fontSize + "px";
    selectedCell.style.fontWeight = formData.isBold ? "bold" : "normal";
    selectedCell.style.fontStyle = formData.isItalic ? "italic" : "normal";
    selectedCell.style.textDecoration = formData.isUnderlined ? "underline" : "none";
    selectedCell.style.textAlign = formData.align;
    selectedCell.style.color = formData.textColor;
    selectedCell.style.backgroundColor = formData.backGroundColor;
});

// Evaluate expressions entered in the expression input
expressionInput.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        try {
            const result = eval(e.target.value);  // Evaluate the expression
            selectedCell.innerText = result;
            // Update the state with the new content
            state[selectedCell.id] = { ...state[selectedCell.id], content: result };
        } catch (error) {
            alert("Invalid expression! Please enter a valid formula.");
        }
    }
});
