/***********
  CONSTANTS
************/
const MIN_GRID_SIZE = 1;
const MAX_GRID_SIZE = 64;
const DEFAULT_GRID_SIZE = 16;

let gridItems = [];
let rgbMode = false;

/**************
  DOM OBJECTS
***************/
const gridContainer = document.querySelector("#grid-container");
const blackButton = document.querySelector("#black-btn");
const rgbButton = document.querySelector("#rgb-btn");
const resetButton = document.querySelector("#reset-btn");
const gridSlider = document.querySelector("#slider");

/*****************
  EVENT LISTENERS
******************/
blackButton.addEventListener('click', () => {
  rgbButton.classList.remove("active");
  blackButton.classList.add("active");
  rgbMode = false;
});

rgbButton.addEventListener('click', () => {
  blackButton.classList.remove("active");
  rgbButton.classList.add("active");
  rgbMode = true;
});

resetButton.addEventListener('click', () => {
  gridItems.forEach(item => {
    item.resetBgColour();
    item.updateBgColour(false);
  });
});

// when slider is released, delete grid and create new grid using sliders value
gridSlider.addEventListener('mouseup', () => {
  const newGridSize = gridSlider.value;
  clearGrid();
  generateGrid(newGridSize);
});

// update slider label as it's moved
gridSlider.addEventListener('input', () => {
  document.querySelector("output").textContent = `${gridSlider.value} x ${gridSlider.value}`;
});

// default values
document.querySelector("#output").textContent = `${DEFAULT_GRID_SIZE} x ${DEFAULT_GRID_SIZE}`;
blackButton.classList.add("active");
gridSlider.setAttribute("value", DEFAULT_GRID_SIZE);
gridSlider.setAttribute("min", MIN_GRID_SIZE);
gridSlider.setAttribute("max", MAX_GRID_SIZE);

/************
  FUNCTIONS
*************/

/**
 * Constructor to create a new gridItem, which has a background colour
 * that changes with each 'mouseover' event
 */
function gridItem() {
  this.currentWhitePercentage = 110;

  this.element = document.createElement('div');
  this.element.classList.add('grid-item');

  this.element.addEventListener('mouseover', (e) => {
    this.updateBgColour(rgbMode);
  });

  this.updateBgColour(false);
}

gridItem.prototype.updateBgColour = function(rgb) {
  if (rgb) {
    this.updateBgColourRGB();
    return;
  }

  this.darken();
  this.updateBgColourBlack();
};

gridItem.prototype.darken = function () {
  if (this.currentWhitePercentage <= 0) {
    return;
  }
  this.currentWhitePercentage -= 10;
};

gridItem.prototype.resetBgColour = function () {
  this.currentWhitePercentage = 110;
};

gridItem.prototype.updateBgColourBlack = function () {
  this.element.style.backgroundColor = `rgb(${this.currentWhitePercentage}%, ${this.currentWhitePercentage}%, ${this.currentWhitePercentage}%)`;
};

gridItem.prototype.updateBgColourRGB = function () {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  this.element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

  this.resetBgColour();
};

/**
 * Uses gridSize specified as a parameter to generate gridSize*gridSize
 * gridItems, adds each to gridContainer DOM object and gridItems array,
 * and generates CSS grid template rule for gridSize*gridSize grid
 * @param {number} gridSize 
 */
function generateGrid(gridSize = DEFAULT_GRID_SIZE) {
  if (gridSize < MIN_GRID_SIZE || gridSize > MAX_GRID_SIZE) {
    gridSize = DEFAULT_GRID_SIZE;
  }

  // create all grid items (gridSize^2)
  for (let n = 0; n < gridSize * gridSize; n += 1) {
    const newGridItem = new gridItem();

    gridContainer.appendChild(newGridItem.element);
    gridItems.push(newGridItem);
  }

  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

}

/**
 * Removes all gridItem elemtns from gridContainer and clears gridItems array
 */
function clearGrid() {
  for (const item of gridItems) {
    gridContainer.removeChild(item.element);
  }

  gridItems = [];
}

/************
  MAIN CODE
 ************/
generateGrid();
