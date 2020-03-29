const DEFAULT_MAX_ROWS = 16;
const DEFAULT_MAX_COLUMNS = 16;

const gridContainer = document.querySelector(".grid-container");
const clearButton = document.querySelector('#clear-button');

clearButton.addEventListener('click', onClearClick);

setGrid(DEFAULT_MAX_COLUMNS, DEFAULT_MAX_ROWS);

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
    setGrid(squaresPerSide, squaresPerSide);
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