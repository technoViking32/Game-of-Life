let rows = 35;
let cols = 60;

let playing = false;

let grid = new Array(rows);
let nextGrid = new Array(rows);

let timer;
let reproductionTime = 100;

function initializeGrids() {
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

function resetGrids() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

function copyAndResetGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

function initialize() {
    createTable();
    initializeGrids();
    resetGrids();
    setupControlButtons();
}

function createTable() {
    let gridContainer = document.getElementById('gridContainer');
    if (!gridContainer) {
        console.error("Problem: No div for the table!");
    }
    let table = document.createElement("table");

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < cols; j++) {//
            let cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    gridContainer.appendChild(table);
}

function cellClickHandler() {
    let rowcol = this.id.split("_");
    let row = rowcol[0];
    let col = rowcol[1];

    let classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = 0;
    } else {
        this.setAttribute("class", "live");
        grid[row][col] = 1;
    }

}

function updateView() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.getElementById(i + "_" + j);
            if (grid[i][j] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
        }
    }
}

function setupControlButtons() {
    let startButton = document.getElementById('start');
    startButton.onclick = startButtonHandler;


    let clearButton = document.getElementById('clear');
    clearButton.onclick = clearButtonHandler;


    let randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandler;

    let gliderButton = document.getElementById("gliderPattern");
    gliderButton.onclick = gliderButtonHandler;

    let vampireButton = document.getElementById("vampirePattern");
    vampireButton.onclick = vampireButtonHandler;
}

function randomButtonHandler() {
    if (playing) return;
    clearButtonHandler();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let isLive = Math.round(Math.random());
            if (isLive == 1) {
                let cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
                grid[i][j] = 1;
            }
        }
    }
}

function clearButtonHandler() {
    console.log("Clear the game: stop playing, clear the grid");

    playing = false;
    let startButton = document.getElementById('start');
    startButton.innerHTML = "Start";
    clearTimeout(timer);

    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.getElementById(i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.style.backgroundColor = ""; 
        }
    }
    
    resetGrids();
}


function startButtonHandler() {
    if (playing) {
        console.log("Pause the game");
        playing = false;
        this.innerHTML = "Continue";
        clearTimeout(timer);
    } else {
        console.log("Continue the game");
        playing = true;
        this.innerHTML = "Pause";
        play();
    }
}
function play() {
    computeNextGen();

    if (playing) {
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            applyRules(i, j);
        }
    }

    copyAndResetGrid();
    updateView();
}


function applyRules(row, col) {
    let numNeighbors = countNeighbors(row, col);
    if (grid[row][col] == 1) {
        if (numNeighbors < 2) {
            nextGrid[row][col] = 0;
        } else if (numNeighbors == 2 || numNeighbors == 3) {
            nextGrid[row][col] = 1;
        } else if (numNeighbors > 3) {
            nextGrid[row][col] = 0;
        }
    } else if (grid[row][col] == 0) {
        if (numNeighbors == 3) {
            nextGrid[row][col] = 1;
        }
    }
}

function countNeighbors(row, col) {
    let count = 0;
    if (row - 1 >= 0) {
        if (grid[row - 1][col] == 1) count++;
    }
    if (row - 1 >= 0 && col - 1 >= 0) {
        if (grid[row - 1][col - 1] == 1) count++;
    }
    if (row - 1 >= 0 && col + 1 < cols) {
        if (grid[row - 1][col + 1] == 1) count++;
    }
    if (col - 1 >= 0) {
        if (grid[row][col - 1] == 1) count++;
    }
    if (col + 1 < cols) {
        if (grid[row][col + 1] == 1) count++;
    }
    if (row + 1 < rows) {
        if (grid[row + 1][col] == 1) count++;
    }
    if (row + 1 < rows && col - 1 >= 0) {
        if (grid[row + 1][col - 1] == 1) count++;
    }
    if (row + 1 < rows && col + 1 < cols) {
        if (grid[row + 1][col + 1] == 1) count++;
    }
    return count;
}
window.onload = initialize;

let selectedColor = "#ff0000"; 

var button = document.getElementById("buttonColor");

button.onclick = function () {
    selectedColor = document.getElementById("color-picker").value;

    var liveCells = document.getElementsByClassName("live");

    for (let i = 0; i < liveCells.length; i++) {
        liveCells[i].style.backgroundColor = selectedColor;
    }
};

function cellClickHandler() {
    let rowcol = this.id.split("_");
    let row = rowcol[0];
    let col = rowcol[1];

    let classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        this.style.backgroundColor = "";
        grid[row][col] = 0;
    } else {
        this.setAttribute("class", "live");
        this.style.backgroundColor = selectedColor; 
        grid[row][col] = 1;
    }
}

function updateView() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.getElementById(i + "_" + j);
            if (grid[i][j] == 0) {
                cell.setAttribute("class", "dead");
                cell.style.backgroundColor = ""; 
            } else {
                cell.setAttribute("class", "live");
                cell.style.backgroundColor = selectedColor; 
            }
        }
    }
}

function glider() {
    let glider = Array.from({ length: 3 }, () => Array(3).fill(0));

    // glider pattern
    glider[1][1] = 1;
    glider[2][2] = 1;
    glider[0][2] = 1;
    glider[2][0] = 1;
    glider[1][0] = 1;

    return glider;
}
function vampire() {
    let vampire = Array.from({ length: 5 }, () => Array(5).fill(0)); // Maak een 5x5 grid


    vampire[1][1] = 1;
    vampire[1][2] = 1;
    vampire[2][1] = 1;
    vampire[2][2] = 1;
    vampire[3][1] = 1;

    return vampire;
}

function addPatternToGrid(grid, pattern, x, y) {
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
            if (pattern[i][j] === 1) {
                grid[x + i][y + j] = pattern[i][j];
            }
        }
    }
}

// glider button
function gliderButtonHandler() {
    let pattern = glider();
    // Plaats van de glider op de grid
    addPatternToGrid(grid, pattern, 15, 13);
    addPatternToGrid(grid, pattern, 15, 10);
    addPatternToGrid(grid, pattern, 18, 13);
    addPatternToGrid(grid, pattern, 16, 16);
    addPatternToGrid(grid, pattern, 15, 34);
    addPatternToGrid(grid, pattern, 15, 31);
    addPatternToGrid(grid, pattern, 18, 34);
    addPatternToGrid(grid, pattern, 16, 37);
    addPatternToGrid(grid, pattern, 15, 54);
    addPatternToGrid(grid, pattern, 15, 51);
    addPatternToGrid(grid, pattern, 18, 54);
    addPatternToGrid(grid, pattern, 16, 57);
    updateView();
}


function vampireButtonHandler() {
    let pattern = vampire();
    addPatternToGrid(grid, pattern, 10, 12);
    addPatternToGrid(grid, pattern, 10, 14);
    addPatternToGrid(grid, pattern, 10, 16);
    addPatternToGrid(grid, pattern, 10, 18);
    addPatternToGrid(grid, pattern, 14, 12);
    addPatternToGrid(grid, pattern, 14, 14);
    addPatternToGrid(grid, pattern, 14, 16);
    addPatternToGrid(grid, pattern, 14, 18);
    addPatternToGrid(grid, pattern, 12, 19);
    updateView();
}

window.onload = initialize;