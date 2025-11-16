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
const rsvpParticipants = document.querySelector(".rsvp-participants");
const formLabels = document.querySelectorAll("#rsvp-form label");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");

  // Main images
  indexMainHeaderGif?.classList.toggle("dark-border", document.body.classList.contains("dark-mode"));
  ExploreMainImage?.classList.toggle("dark-border", document.body.classList.contains("dark-mode"));

  // Explore bg
  if (exploreBody) {
    exploreBody.style.backgroundColor = 
      document.body.classList.contains("dark-mode") ? "#2C3930" : "#f1eac0";
  }

  // Dark mode button
  themeButton?.classList.toggle("dark-mode", document.body.classList.contains("dark-mode"));

  // About page paragraphs
  aboutParagraphs.forEach(p => {
    p.style.color = document.body.classList.contains("dark-mode") ? "#f8f8f8" : "";
  });

  // About facts container
  aboutFactsContainer.forEach(el => {
    el.style.color = document.body.classList.contains("dark-mode") ? "#f8f8f8" : "";
  });

  // RSVP first paragraph
  rsvpPara?.classList.toggle("dark-mode", document.body.classList.contains("dark-mode"));

  // RSVP participants (single element — no foreach!)
  if (rsvpParticipants) {
    rsvpParticipants.classList.toggle("dark-mode", document.body.classList.contains("dark-mode"));
  }

  // Form labels
  formLabels.forEach(label => {
    label.classList.toggle("dark-mode", document.body.classList.contains("dark-mode"));
  });
};

themeButton?.addEventListener("click", toggleDarkMode);

/*
explore.html event card button
*/
const cardContainer = document.querySelector('.cardContainer');
const arrowLeft = document.querySelector('.arrowLeft');
const arrowRight = document.querySelector('.arrowRight');

// Put EVERYTHING inside this check
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

const addParticipant = (event, person) => {
    // Step 2: Write your code to manipulate the DOM here
    event.preventDefault();

    const newParticipant = document.createElement("p");
    newParticipant.textContent = `♻️ ${person.name} from ${person.city} has RSVP'd!`;

    const participantsContainer = document.querySelector(".rsvp-participants");
    participantsContainer?.appendChild(newParticipant);

    // STRETCH: Increase the count of participants
    const oldCounter = document.getElementById("rsvp-count");
    if (oldCounter) {
        oldCounter.remove()
    }

    count = count + 1;

    const newCounter = document.createElement("p");
    newCounter.id = "rsvp-count";
    newCounter.textContent = `🍃 ${count} people have RSVP'd to this event!`;

    participantsContainer?.appendChild(newCounter);
    
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

    let person = {
      name: rsvpInputs[0].value,
      city: rsvpInputs[1].value,
      email: rsvpInputs[2].value
    }

    if (person.name.length < 2) {
        containsErrors = true;
        rsvpInputs[0].classList.add("error"); // highlights invalid name
    } else {
        rsvpInputs[0].classList.remove("error");
    }
    if (person.city.length <2) {
        containsErrors = true;
        rsvpInputs[1].classList.add("error");
    } else {
        rsvpInputs[1].classList.remove("error");
    }
    if (person.email.length < 2 || !person.email.includes("@")) { // STRETCH TODO
        containsErrors = true;
        rsvpInputs[2].classList.add("error");
    } else {
        rsvpInputs[2].classList.remove("error");
    }


  // TODO: If no errors, call addParticipant() and clear fields
    if (containsErrors == false) {
        addParticipant(event, person);
        toggleModal(person);

        for (let i = 0; i < rsvpInputs.length; i++) {
            rsvpInputs[i].value = ""; // clear form fields
        }
    }
  

}

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
rsvpButton?.addEventListener("click", validateForm);

/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

const toggleModal = (person) => {
  let modal = document.getElementById("success-modal");
  let modalContent = document.getElementById("modal-text");
  // TODO: Update modal display to flex
  modal.style.display = "flex";

  // TODO: Update modal text to personalized message
  modalContent.textContent = `You've successfully RSVP'd! Thank you for joining us ${person.name}! You will now receive an email confirming your sign up.`;

  // Set modal timeout to 5 seconds
    let intervalId = setInterval(animateImage, 500);
    setTimeout(() => {
      modal.style.display = "none";
      clearInterval(intervalId);
    }, 8000);

    
}

// TODO: animation variables and animateImage() function
rotateFactor = 0;
modalImage = document.getElementById("modal-image");

// Instead of the if statement, 
// you could also use a ternary operator here (rotateFactor = rotateFacotr === 1 ? 0.8 : 1)
const animateImage = () => { 
    if (rotateFactor === 0 ) {
        rotateFactor = -10;
    } else {
      rotateFactor = 0;
    }
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}

// Close modal button
const closeModalButton = document.getElementById("close-modal");
let modal = document.getElementById("success-modal");

if (closeModalButton && modal) {
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});
}
/*** Scroll Animations ***
  
  Purpose:
  - Use this starter code to add scroll animations to your website.

  When To Modify:
  - [ ] Project 8 (REQUIRED FEATURE)
  - [ ] Any time after
***/

// Reduce motion button
let reduceMotionButton = document.getElementById("reduce-motion-button");

const toggleReduceMotion = () => {
  const body = document.body;
  document.body.classList.toggle("reduced-motion");

  if (body.classList.contains("reduced-motion")) {
    reduceMotionButton.textContent = "Reduce Motion On";
    reduceMotionButton.classList.add("active");
  } else {
    reduceMotionButton.textContent = "Reduce Motion Off";
    reduceMotionButton.classList.remove("active");
  }
};


reduceMotionButton?.addEventListener("click", toggleReduceMotion);

// Step 1: Select all elements with the class 'revealable'.
let revealableContainers = document.querySelectorAll('.revealable');

// Step 2: Write function to reveal elements when they are in view.
const reveal = () => {
  if (document.body.classList.contains("reduce-motion")) return;
    for (let i = 0; i < revealableContainers.length; i++) {
        let current = revealableContainers[i];

        // Get current height of container and window
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = current.getBoundingClientRect().top;
        let revealDistance = parseInt(getComputedStyle(current).getPropertyValue('--reveal-distance'), 10);

        // If the container is within range, add the 'active' class to reveal
        if (topOfRevealableContainer < windowHeight - revealDistance) {
            revealableContainers[i].classList.add('active');
        }
        // If the container is not within range, hide it by removing the 'active' class
        else { 
            revealableContainers[i].classList.remove('active');
        }
    }
}

// Step 3: Whenever the user scrolls, check if any containers should be revealed
reveal();
window.addEventListener('scroll', reveal);

