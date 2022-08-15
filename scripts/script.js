let gridSize = 16;
const gridContainer = document.querySelector("#grid-container");
const gridItems = [];

generateGrid();
addGridTileEventListeners();

document.querySelector("#reset-btn").addEventListener('click', resetGridItems);
        
/*
  generateGridItem()

  Creates and returns a new grid item and its appropriate methods
  and variables.
*/
function generateGridItem() {
  const gridItem = {
    element: document.createElement('div'),
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
}

/*
  generateGrid()

  Uses the gridSize global variable to generate gridSize*gridSize
  new html elements, adds grid-item class to them and adds them to
  the gridContainer element and gridItems array.
*/
function generateGrid() {
  for (let n = 0; n < gridSize*gridSize; n+=1) {
    const gridItem = {
      element: document.createElement('div'),
      currentWhitePercentage: 100
    };

    gridItem.element.classList.add('grid-item');

    gridItem.element.style.backgroundColor = 'rgb(100%, 100%, 100%)';
    gridContainer.appendChild(gridItem.element);

    gridItems.push(gridItem);
  }

  let generatedGridTemplate = "";
  
  // Generates 'grid-column-template' CSS rule
  for (let n = 0; n < gridSize; n+=1) {
    generatedGridTemplate += " auto";
  }

  gridContainer.style.gridTemplateColumns = generatedGridTemplate;
}

/*
  resetGridItems()

  Resets colour on grid items to default (white). 
*/

function resetGridItems() {
  gridItems.forEach(item => {
    item.currentWhitePercentage = 100;
    item.element.style.backgroundColor = "rgb(100%, 100%, 100%)";
  });
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
      if (gridItem.currentWhitePercentage <= 0) {
        return;
      }

      gridItem.currentWhitePercentage -= 10;
      gridItem.element.style.backgroundColor = `rgb(${gridItem.currentWhitePercentage}%, ${gridItem.currentWhitePercentage}%, ${gridItem.currentWhitePercentage}%)`;
    });
  }
}
