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
            gridContainer.appendChild(gridSquare);
        }
    }
}

function onMouseOver(e) {
    let gridSquare = e.target;
    gridSquare.classList.add('grid-square--mouseover');
}

function onClearClick(e) {
    let gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach((square) => {
        square.classList.remove('grid-square--mouseover');
    })
}