// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

// Create asynchronous function setup that will be called when the page loads.
// Inside the setup function, select the button element and the card-area element and store them in variables $btn and $cardArea, respectively.
// Use the Deck of Cards API to create a new deck and store the deck data in a variable deckData. The URL for creating a new deck is `${baseURL}/new/shuffle/`.
// Show the button by calling the show method on $btn.
// Add a click event listener to the button that will call an asynchronous function when the button is clicked.
// Inside the click event listener, use the Deck of Cards API to draw a card from the deck and store the card data in a variable cardData. The URL for drawing a card from a deck is `${baseURL}/${deckData.deck_id}/draw/`.
// Store the image URL of the card in a variable cardSrc.
// Generate a random angle between -45 and 45 degrees and store it in a variable angle.
// Generate random x and y coordinates between -20 and 20 pixels and store them in variables randomX and randomY.
// Append an image element to the $cardArea element with the following properties:
// Set the src attribute to cardSrc.
// Set the transform CSS property to translate the image by randomX and randomY pixels and rotate it by angle degrees.
// If there are no cards remaining in the deck, remove the button by calling the remove method on $btn.
// Call the setup function to set up the page when it loads.
// Note: The baseURL variable is defined in the global scope and contains the base URL for the Deck of Cards API.
// Solution:

document.addEventListener("DOMContentLoaded", function () {
  let baseURL = "https://deckofcardsapi.com/api/deck";

  async function setup() {
    // Initialize the btn and cardArea variables to store the button and card-area elements.
    let btn = document.querySelector("button");
    let cardArea = document.getElementById("card-area");

    // Initially hide the button
    btn.style.display = "none";

    try {
      let response = await fetch(`${baseURL}/new/shuffle/`);
      let deckData = await response.json();
      // Show the button after the deck has been created
      btn.style.display = "block";

      // Add event listener to the button on click event.
      btn.addEventListener("click", async function () {
        try {
          // Fetch a new card from the deck
          let response = await fetch(`${baseURL}/${deckData.deck_id}/draw/`);
          let cardData = await response.json();
          console.log("Card drawn:", cardData);

          // Display the card image
          let cardSrc = cardData.cards[0].image;

          // Randomly position the card on the page and rotate it
          let angle = Math.random() * 90 - 45;
          let randomX = Math.random() * 40 - 20;
          let randomY = Math.random() * 40 - 20;

          // Create an image element and set its properties
          let img = document.createElement("img");
          img.src = cardSrc;
          img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;

          // Append the image to the card area
          cardArea.appendChild(img);

          // Remove the button if there are no cards remaining
          if (cardData.remaining === 0) btn.remove();
        } catch (error) {
          console.error("Error drawing card:", error);
        }
      });
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  }
  // Call the setup function when the page loads
  setup();
});
