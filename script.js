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
// targets getInvoled.html certain black elements
const rsvpPara = document.querySelector(".rsvp-para p");
const rsvpParticipants = document.querySelector(".rvsp-participants");
const formLabels = document.querySelectorAll("#rsvp-form label");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  
  if (indexMainHeaderGif) {
    if (document.body.classList.contains("dark-mode")) {
      indexMainHeaderGif.classList.add("dark-border");
    } else {
      indexMainHeaderGif.classList.remove("dark-border"); // lets me cuztomize the border color in css
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

  if (rsvpPara) {
    if (document.body.classList.contains("dark-mode")) {
      rsvpPara.classList.add("dark-mode");
    } else {
      rsvpPara.classList.remove("dark-mode"); // reset to default for light mode
    }
  }

  rsvpParticipants.forEach(p => {
    if (document.body.classList.contains("dark-mode")) {
      rsvpParticipants.classList.add("dark-mode");
    } else {
      rsvpParticipants.classList.remove("dark-mode");
    }
  });

  formLabels.forEach(label => {
    if (document.body.classList.contains("dark-mode")) {
      formLabels.classList.add("dark-mode");
    } else {
      formLabels.classList.remove("dark-mode");
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

// ✅ Put EVERYTHING inside this check
if (cardContainer && arrowLeft && arrowRight) {
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
}

/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
const rsvpButton = document.getElementById("rsvp-button")
let count = 3;

const addParticipant = (event) => {
    // Step 2: Write your code to manipulate the DOM here
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const city = document.querySelector("#city").value;
    const email = document.querySelector("#email").value;

    const newParticipant = document.createElement("p");
    newParticipant.textContent = `♻️ ${name} from ${city} has RSVP'd!`;

    const participantsContainer = document.querySelector(".rsvp-participants");
    participantsContainer.appendChild(newParticipant);

    // STRETCH: Increase the count of participants
    const oldCounter = document.getElementById("rsvp-count");
    if (oldCounter) {
        oldCounter.remove()
    }

    count = count + 1;

    const newCounter = document.createElement("p");
    newCounter.id = "rsvp-count";
    newCounter.textContent = `🍃 ${count} people have RSVP'd to this event!`;

    participantsContainer.appendChild(newCounter);
    
}

// Step 3: Add a click event listener to the submit RSVP button here

/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = () => {

  let containsErrors = false;

  var rsvpInputs = document.getElementById("rsvp-form").elements;
  // TODO: Loop through all inputs
    for (let i = 0; i < rsvpInputs.length; i++) {
        let input = rsvpInputs[i];

     // TODO: Inside loop, validate the value of each input
            if (input.value.length < 2) {
                containsErrors = true;
                input.classList.add("error");
            } else {
                input.classList.remove("error");
            }
    }
    // STRETCH TODO: @ email validation
    const emailInput = document.getElementById("email");

    if (!emailInput.value.includes("@")) {
        containsErrors = true;
        emailInput.classList.add("error"); // highlights invalid email
    } else {
        emailInput.classList.remove("error");
    }
  // TODO: If no errors, call addParticipant() and clear fields
    if (containsErrors == false) {
        addParticipant(event);

        for (let i = 0; i < rsvpInputs.length; i++) {
            rsvpInputs[i].value = ""; // clear form fields
        }
    }
  

}

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
rsvpButton.addEventListener("click", validateForm);