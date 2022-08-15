let gridSize = 16;
const gridContainer = document.querySelector("#grid-container");
const gridItems = [];

generateGrid();
addGridTileEventListeners();

document.querySelector("#reset-btn")
        .addEventListener('click', resetGridItems);
        
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
function generateGrid() {
  for (let n = 0; n < gridSize*gridSize; n+=1) {
    let gridItem = document.createElement("div");
  
    gridItem.classList.add("grid-item");
    gridContainer.appendChild(gridItem);
  
    gridItems.push(gridItem);
  }

  let generatedGridTemplate = "";
  
  // Generates 'grid-column-template' CSS rule
  for (let n = 0; n < gridSize; n+=1) {
    generatedGridTemplate += " auto";
  }

  gridContainer.style.gridTemplateColumns = generatedGridTemplate;

}
*/

/*
  resetGridItems()

  Resets colour on grid items to default (white). 

function resetGridItems() {
  gridItems.forEach(item => {
    item.style.backgroundColor = "rgba(0, 0, 0, 0)";
  });
}
*/

/*
  addGridTileEventListeners()

  Adds an event listener to each item in the gridItems array which
  updates the background colour of each item when the mouse is hovered
  over it.

function addGridTileEventListeners() {
  for (let i = 0; i < gridItems.length; i += 1) {
    gridItems[i].addEventListener("mouseover", (e) => {
  
      // current background colour of grid item
      const newAlphaValue = getNewAlphaValue(gridItems[i]);
  
      gridItems[i].style.backgroundColor = `rgba(0, 0, 0, ${newAlphaValue})`;
    });
  }
  
}
*/

/*
  getNewAlphaValue()

  Takes a grid item as parameter, gets it's current background-color
  style as a string, and extracts the alpha value from the string. If
  the current alpha value is between 0 and 0.9 inclusive, increments
  alpha value and returns it. Otherwise, returns 1.

function getNewAlphaValue(gridItem) {
  // returns 'rgba()' string, or rgb() string if alpha value is already 1
  const rgbaString = getComputedStyle(gridItem)
                    .getPropertyValue("background-color");

  // 14 is first index of rgba() alpha value, ")" is closing bracket
  let alphaValue = rgbaString.substring(14, rgbaString.indexOf(")"));
 
  alphaValue = parseFloat(alphaValue);
  
  if (alphaValue >= 1 || typeof alphaValue !== "number") {
    return 1;
  }

  return alphaValue + 0.1;
}
*/