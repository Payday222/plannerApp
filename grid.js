const gridContainer = document.getElementById('gridContainer');
let cellCount = 0;
const cellWidth = 50; // Width of each cell
const cellHeight = 50; // Height of each cell

function createCell(x, y) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.innerHTML = `<strong>${x}, ${y}</strong>`;
    cell.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        alert(`Right-clicked on cell at (${x}, ${y})`);
    });
    gridContainer.appendChild(cell);
}

function generateCells(count) {
    const cellsPerRow = Math.floor(gridContainer.clientWidth / cellWidth); // Calculate cells per row based on container width
    
    // Check if cellsPerRow is zero or invalid
    if (cellsPerRow <= 0) return; // If it's zero, avoid generating cells

    const totalCells = cellCount; // Store the current total cell count

    for (let i = 0; i < count; i++) {
        const x = (totalCells + i) % cellsPerRow; // Calculate x based on the total number of cells
        const y = Math.floor((totalCells + i) / cellsPerRow); // Calculate y based on the total number of cells
        createCell(x, y);
    }

    cellCount += count; // Update the total cell count
    checkGridWidth(); // Check if the grid width is large enough for horizontal scroll
}

function checkGridWidth() {
    const cellsPerRow = Math.floor(gridContainer.clientWidth / cellWidth);
    const totalRows = Math.ceil(cellCount / cellsPerRow);
    const gridWidth = cellsPerRow * cellWidth;
    gridContainer.style.width = `${gridWidth}px`; // Dynamically set the grid container width
}

function checkScroll() {
    const scrollTop = gridContainer.scrollTop;
    const scrollHeight = gridContainer.scrollHeight;
    const clientHeight = gridContainer.clientHeight;

    const scrollLeft = gridContainer.scrollLeft;
    const scrollWidth = gridContainer.scrollWidth;
    const clientWidth = gridContainer.clientWidth;

    // Check for vertical scroll
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        generateCells(20); // Generate more cells when scrolling down
    }

    // Check for horizontal scroll
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
        generateCells(20); // Generate more cells when scrolling right
    }

    // Check for horizontal scroll in the opposite direction
    if (scrollLeft < 10) {
        generateCells(20); // Generate more cells when scrolling left
    }
}

// Add event listener for scroll
gridContainer.addEventListener('scroll', checkScroll);

// Initially generate a large number of cells
window.addEventListener('load', () => {
    generateCells(800); // Generate initial cells once the window has fully loaded
});
