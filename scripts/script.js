const gridItems = document.querySelectorAll('.grid-item');

for (let i = 0; i < gridItems.length; i += 1) {
  gridItems[i].addEventListener('mouseover', (e) => {
    gridItems[i].style.backgroundColor = 'black';
  });
}