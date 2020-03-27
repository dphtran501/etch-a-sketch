const MAX_ROWS = 16;
const MAX_COLUMNS = 16;

const gridContainer = document.querySelector(".grid-container");

for (let r = 1; r <= MAX_ROWS; r++){
    for (let c = 1; c <= MAX_COLUMNS; c++){
        let gridSquare = document.createElement("div");
        gridSquare.setAttribute("grid-column", Number(c));
        gridSquare.setAttribute("grid-row", Number(r));
        gridSquare.classList.add('grid-square');
        gridSquare.addEventListener('mouseover', onMouseOver);
        gridContainer.appendChild(gridSquare);
    }
}

function onMouseOver(e) {
    let gridSquare = e.target;
    gridSquare.classList.add('grid-square--mouseover');
}