// dark mode toggle
const themeButton = document.getElementById("themeButton");
// main header gif in the home page (index.html) (border is being added to both imgs due to color discrepancies in dark mode)
const indexMainHeaderGif = document.getElementById("mainHeaderGif");
//main header img in the explore page (explore.html)
const ExploreMainImage = document.getElementById("mainImage");
// Targets all the p elements (about.html) I could've also used the div id (aboutContent) to target all the p elements 
const aboutParagraphs = document.querySelectorAll("#aboutBody p");
// in (about.html), the FactsContainer div doesn't have p elements, only header elements & list elements, so no need to target those
const aboutFactsContainer = document.querySelectorAll("#FactsContainer h1, #FactsContainer h2, #FactsContainer h3, #FactsContainer h4, #FactsContainer h5, #FactsContainer h6, #FactsContainer p, #FactsContainer ul, #FactsContainer li")
// targeting exploreBody since background is already altered | will change background inside js instead of css
const exploreBody = document.getElementById("exploreBody");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  
  if (indexMainHeaderGif) {
    if (document.body.classList.contains("dark-mode")) {
      indexMainHeaderGif.classList.add("dark-border");
    } else {
      indexMainHeaderGif.classList.remove("dark-border");
    }
  }

  if (ExploreMainImage) {
    if (document.body.classList.contains("dark-mode")) {
      ExploreMainImage.classList.add("dark-border");
    } else {
      ExploreMainImage.classList.remove("dark-border");
    }
  }
  if (exploreBody) {
    exploreBody.style.backgroundColor = document.body.classList.contains("dark-mode") ? "#2C3930" : "#f1eac0";
  }

  if (themeButton) {
    if (document.body.classList.contains("dark-mode")) {
      themeButton.classList.add("dark-mode");
    } else {
      themeButton.classList.remove("dark-mode");
    }
  }
  aboutParagraphs.forEach(p => {
    if (document.body.classList.contains("dark-mode")) {
      p.style.color = "#f8f8f8"; // off-white for dark mode
    } else {
      p.style.color = ""; // reset to default for light mode
    }
  });
  aboutFactsContainer.forEach(el => {
    if (document.body.classList.contains("dark-mode")) {
      el.style.color = "#f8f8f8"; // off-white for dark mode
    } else {
      el.style.color = ""; // reset for light mode
    }
  });
};

themeButton.addEventListener("click", toggleDarkMode);

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

/*** Form Handling [PLACEHOLDER] [UNIT 6] ***/
/*** Form Validation [PLACEHOLDER] [UNIT 7] ***/
/*** Animations [PLACEHOLDER] [UNIT 8] ***/
/*** Success Modal [PLACEHOLDER] [UNIT 9] ***/
