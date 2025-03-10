const gridContainer = document.getElementById('gridContainer');
let cellCount = 0;
const cellWidth = 50; 
const cellHeight = 50; 

function createCell(x, y) {
    const cell = document.createElement('div');
    cell.className = `cell${x}${y}`;
    cell.id = `cell${x}${y}`;
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.innerHTML = `<strong>${x}, ${y}</strong>`;
    
    // Attach click event listener directly to the cell when it is created
    cell.addEventListener('click', function() {
        console.log(`Cell clicked at: (${x}, ${y})`);

        const coordinateInput = document.getElementById("coordinateInput");
        coordinateInput.value = `${x},${y}`;
    });

    // Attach right-click event listener as well (optional)
    cell.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        alert(`Right-clicked on cell at (${x}, ${y})`);
    });

    gridContainer.appendChild(cell);
}

function generateCells(count) {
    const cellsPerRow = Math.floor(gridContainer.clientWidth / cellWidth); 
    
    if (cellsPerRow <= 0) return; 

    for (let i = 0; i < count; i++) {
        const x = (cellCount + i) % cellsPerRow; // Unique x for each new cell
        const y = Math.floor((cellCount + i) / cellsPerRow); // Unique y for each new cell
        createCell(x, y);  // Create cell with event listener attached immediately
    }

    cellCount += count;
    checkGridWidth();
}

function checkGridWidth() {
    const cellsPerRow = Math.floor(gridContainer.clientWidth / cellWidth);
    const totalRows = Math.ceil(cellCount / cellsPerRow);
    const gridWidth = cellsPerRow * cellWidth;
    gridContainer.style.width = `${gridWidth}px`;
}

function checkScroll() {
    const scrollTop = gridContainer.scrollTop;
    const scrollHeight = gridContainer.scrollHeight;
    const clientHeight = gridContainer.clientHeight;

    const scrollLeft = gridContainer.scrollLeft;
    const scrollWidth = gridContainer.scrollWidth;
    const clientWidth = gridContainer.clientWidth;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
        generateCells(20); 
    }

    if (scrollLeft + clientWidth >= scrollWidth - 10) {
        generateCells(20);
        console.log('adding left')
    }

    if (scrollLeft < 10) {
        generateCells(20);
    }
}

gridContainer.addEventListener('scroll', checkScroll);

window.addEventListener('load', () => {
    generateCells(800);
    
});
