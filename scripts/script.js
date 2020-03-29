let defaultMaxRows = 16;
let defaultMaxColumns = 16;

const gridContainer = document.querySelector(".grid-container");
const clearButton = document.querySelector('#clear-button');
const gridButton = document.querySelector('#grid-button');

clearButton.addEventListener('click', onClearClick);
gridButton.addEventListener('click', onGridToggle);

// Default settings
let isGridOn = true;
setGrid(defaultMaxColumns, defaultMaxRows);

function setGrid(numberOfColumns, numberOfRows) {
    // Set grid container
    gridContainer.style.gridTemplateColumns = "repeat(" + numberOfColumns + ", minmax(" + gridContainer.clientWidth/numberOfColumns + "px, 1fr))";
    gridContainer.style.gridTemplateRows = "repeat(" + numberOfRows + ", minmax(" + gridContainer.clientHeight/numberOfRows + "px, 1fr))";
    // Add grid items (squares)
    for (let r = 1; r <= numberOfRows; r++){
        for (let c = 1; c <= numberOfColumns; c++){
            let gridSquare = document.createElement("div");
            gridSquare.setAttribute("grid-column", c);
            gridSquare.setAttribute("grid-row", r);
            gridSquare.classList.add('grid-square');
            toggleGridSquare(gridSquare, isGridOn);
            gridSquare.addEventListener('mouseover', onMouseOver);
            gridSquare.dataset.mouseoverPasses = 0; // Record number of mouseover passes in square
            gridContainer.appendChild(gridSquare);
        }
    }
}

function onMouseOver(e) {
    let gridSquare = e.target;
    let mouseoverPasses = Number(gridSquare.dataset.mouseoverPasses);
    if (mouseoverPasses == 0){
        // Store original RGB
        let red = randomColorIntensity();
        gridSquare.dataset.originalRed = red;
        let green = randomColorIntensity();
        gridSquare.dataset.originalGreen = green;
        let blue = randomColorIntensity();
        gridSquare.dataset.originalBlue = blue;
        
        gridSquare.style.backgroundColor = getRGB(red, green, blue);
        gridSquare.dataset.mouseoverPasses = mouseoverPasses + 1;
    }
    else if (mouseoverPasses == 10){
        gridSquare.style.backgroundColor = getRGB(0,0,0);
    }
    else if (mouseoverPasses < 10){
        let originalRed = Number(gridSquare.dataset.originalRed);
        let originalGreen = Number(gridSquare.dataset.originalGreen);
        let originalBlue = Number(gridSquare.dataset.originalBlue);
        // Add 10% black
        let newRed = originalRed - Math.floor(originalRed / 10 * mouseoverPasses);
        let newGreen = originalGreen - Math.floor(originalGreen / 10 * mouseoverPasses);
        let newBlue = originalBlue - Math.floor(originalBlue / 10 * mouseoverPasses);
        
        gridSquare.style.backgroundColor = getRGB(newRed, newGreen, newBlue);
        gridSquare.dataset.mouseoverPasses = mouseoverPasses + 1;
    }
}

function onClearClick(e) {
    let gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach((square) => {
        square.style.backgroundColor = 'transparent';
        square.dataset.mouseoverPasses = 0;
    })

    resetGrid();
}
function resetGrid() {
    removeGridSqures();
    let squaresPerSide = Number(window.prompt("How many squares per side?"));
    if (squaresPerSide != null && squaresPerSide != '' && !isNaN(squaresPerSide)){
        defaultMaxRows = squaresPerSide;
        defaultMaxColumns = squaresPerSide;
    }
    
    setGrid(defaultMaxColumns, defaultMaxRows);
}

function removeGridSqures() {
    while (gridContainer.hasChildNodes()){
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function getRGB(red, green, blue) {
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function randomColorIntensity() {
    return Math.floor(Math.random() * 256);
}

function onGridToggle(e) {
    toggleGrid(!isGridOn)   // Set grid to opposite of current grid state (e.g. if currently on, turn grid off)

    isGridOn = !isGridOn;

    if (isGridOn){
        gridButton.title = "Turn Grid Off";
        gridButton.classList.remove('grid-button--off')
        gridButton.classList.add('grid-button--on');
    }
    else {
        gridButton.title = "Turn Grid On";
        gridButton.classList.remove('grid-button--on')
        gridButton.classList.add('grid-button--off');
    }
}

function toggleGrid(gridState) {
    let gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach((square) => {
        toggleGridSquare(square, gridState);
    })
}

function toggleGridSquare(square, gridState){
    if (gridState){ // turn grid on
        square.classList.remove('grid-square--gridoff');
        square.classList.add('grid-square--gridon');
    }
    else {  // turn grid off
        square.classList.remove('grid-square--gridon');
        square.classList.add('grid-square--gridoff');
    }
}