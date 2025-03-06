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
    const cellsPerColumn = Math.floor(gridContainer.clientHeight / cellHeight); // Calculate cells per column based on container height

    // Ensure cellsPerRow and cellsPerColumn are valid
    if (cellsPerRow <= 0 || cellsPerColumn <= 0) return; // Prevent invalid calculations

    const totalCells = cellCount; // Store the current total cell count

    for (let i = 0; i < count; i++) {
        const x = (totalCells + i) % cellsPerRow; // Calculate x based on the total number of cells
        const y = Math.floor((totalCells + i) / cellsPerRow); // Calculate y based on the total number of cells
        createCell(x, y);
    }

    cellCount += count; // Update the total cell count
    checkGridDimensions(); // Check if the grid dimensions are large enough for horizontal and vertical scrolling
}

function checkGridDimensions() {
    const cellsPerRow = Math.floor(gridContainer.clientWidth / cellWidth);
    const cellsPerColumn = Math.floor(gridContainer.clientHeight / cellHeight);
    const totalRows = Math.ceil(cellCount / cellsPerRow);
    
    // Dynamically calculate grid width and height
    const gridWidth = cellsPerRow * cellWidth;
    const gridHeight = cellsPerColumn * cellHeight;

    gridContainer.style.width = `${gridWidth}px`; // Dynamically set the grid container width
    gridContainer.style.height = `${gridHeight}px`; // Dynamically set the grid container height
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

    // Check for vertical scroll in the opposite direction
    if (scrollTop < 10) {
        generateCells(20); // Generate more cells when scrolling up
    }
}

// Add event listener for scroll
gridContainer.addEventListener('scroll', checkScroll);

// Initially generate a large number of cells
window.addEventListener('load', () => {
    generateCells(800); // Generate initial cells once the window has fully loaded
});
