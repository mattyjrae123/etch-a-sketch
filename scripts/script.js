/***********
  CONSTANTS
************/
const MIN_GRID_SIZE = 1;
const MAX_GRID_SIZE = 64;
const DEFAULT_GRID_SIZE = 16;

let gridItems = [];

/**************
  DOM OBJECTS
***************/
const gridContainer = document.querySelector("#grid-container");
const resetButton = document.querySelector("#reset-btn");
const gridSlider = document.querySelector("#slider");

// default value for output element under slider
document.querySelector("#output").textContent = DEFAULT_GRID_SIZE;

/*****************
  EVENT LISTENERS
******************/
resetButton.addEventListener('click', () => {
  gridItems.forEach(item => {
    item.resetBgColour();
    item.updateBgColour();
  });
});

// when slider is released, delete grid and create new grid using sliders value
gridSlider.addEventListener('mouseup', () => {
  const newGridSize = gridSlider.value;
  clearGrid();
  createGrid(newGridSize);
  addGridTileEventListeners();
});

// update slider label as it's moved
gridSlider.addEventListener('input', () => {
  document.querySelector("output").textContent = gridSlider.value;
});

/************
  FUNCTIONS
*************/

/*
  createGridItem()

  Creates and returns a new grid item and its appropriate methods
  and variables.
*/
function createGridItem() {
  const gridItem = {
    element: document.createElement('div'),
    /* 100 = white, 0 = black. Values in between are shades of grey */
    currentWhitePercentage: 100,

    darken: function() {
      if (this.currentWhitePercentage <= 0) {
        return;
      }
      this.currentWhitePercentage -= 10;
    },

    resetBgColour: function() {
      this.currentWhitePercentage = 100;
    },

    updateBgColour: function() {
      this.element.style.backgroundColor = `rgb(${this.currentWhitePercentage}%, ${this.currentWhitePercentage}%, ${this.currentWhitePercentage}%)`;
    }
  };

  gridItem.element.classList.add('grid-item');
  gridItem.updateBgColour();

  return gridItem;
}

/*
  createGrid()

  Uses the gridSize global variable to generate gridSize*gridSize
  new html elements, adds grid-item class to them and adds them to
  the gridContainer element and gridItems array.
*/
function createGrid(gridSize=DEFAULT_GRID_SIZE) {
  if (gridSize < MIN_GRID_SIZE || gridSize > MAX_GRID_SIZE) {
    gridSize = DEFAULT_GRID_SIZE;
  }

  // create all grid items (gridSize^2)
  for (let n = 0; n < gridSize*gridSize; n+=1) {
    const gridItem = createGridItem();

    gridContainer.appendChild(gridItem.element);
    gridItems.push(gridItem);
  }

  // generate 'grid-column-template' CSS rule
  let generatedGridTemplate = "";
  
  for (let n = 0; n < gridSize; n+=1) {
    generatedGridTemplate += " auto";
  }

  gridContainer.style.gridTemplateColumns = generatedGridTemplate;
}

/*
  clearGrid()

  Removes all gridItem elements from the grid and clears gridItems
  array
*/
function clearGrid() {
  for (const item of gridItems) {
    gridContainer.removeChild(item.element);
  }

  gridItems = [];
}

/*
  addGridTileEventListeners()

  Adds an event listener to each item in the gridItems array which
  updates the background colour of each item when the mouse is hovered
  over it.
*/
function addGridTileEventListeners() {
  for (let i = 0; i < gridItems.length; i+=1) {
    const gridItem = gridItems[i];
    gridItem.element.addEventListener('mouseover', (e) => {
      gridItem.darken();
      gridItem.updateBgColour();
    });
  }
}

/************
  MAIN CODE
 ************/
createGrid();
addGridTileEventListeners();
