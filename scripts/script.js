const gridItems = document.querySelectorAll(".grid-item");

// Add eventListeners to all grid items
for (let i = 0; i < gridItems.length; i += 1) {
  gridItems[i].addEventListener("mouseover", (e) => {

    // current background colour of grid item
    const newAlphaValue = getNewAlphaValue(gridItems[i]);

    gridItems[i].style.backgroundColor = `rgba(0, 0, 0, ${newAlphaValue})`;
  });
}

/*

  getNewAlphaValue()

  Takes a grid item as parameter, gets it's current background-color
  style as a string, and extracts the alpha value from the string. If
  the current alpha value is between 0 and 0.9 inclusive, increments
  alpha value and returns it. Otherwise, returns 1.
*/
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