// dark mode toggle


/*
explore.html event card button
*/
const cardContainer = document.querySelector('.cardContainer');
const arrowLeft = document.querySelector('.arrowLeft');
const arrowRight = document.querySelector('.arrowRight');

let scrollPosition = 0;
const cardWidth = 320; // same width as each card + margin
const cardsVisible = 3;

arrowRight.addEventListener('click', () => {
  const maxScroll = (cardContainer.children.length - cardsVisible) * cardWidth;
  if (scrollPosition < maxScroll) {
    scrollPosition += cardWidth;
    cardContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }
});

arrowLeft.addEventListener('click', () => {
  if (scrollPosition > 0) {
    scrollPosition -= cardWidth;
    cardContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }
});
