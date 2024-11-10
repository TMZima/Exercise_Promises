// Part 1: Number Facts

// 1. Make a request to the Numbers API http://numbersapi.com/ to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.

let favNum = 7;
const baseURL = "http://numbersapi.com/";

// Using async and await. async function is used to define an asynchronous function that returns a promise. The await keyword is used to pause the execution of the async function and wait for the promise to resolve prior to moving on.
async function getFavNumFact() {
  // To catch errors, use a try/catch block. If an error occurs, the catch block will run and the error will be logged to the console.
  try {
    // Initialize a variable to store the response from the fetch request. Using await will pause the execution of the function until the promise is resolved.
    let res = await fetch(`${baseURL}${favNum}?json`);
    // Initialize a variable to store the JSON data from the response.
    let data = await res.json();
    // Log the text property of the data object to the console.
    console.log(data.text);
  } catch (err) {
    // Catch any errors that occur during the fetch request and log them to the console.
    console.error("Error fetching favorite number fact:", err);
  }
}
// To call this function, use the following code:
// getFavNumFact(); Note: favNum is a global variable and this function only accepts one number.

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

async function getMultipleNumFacts() {
  try {
    // Initialize a variable to store the response from the fetch request. Using await will pause the execution of the function until the promise is resolved.
    let res = await fetch(`${baseURL}${favNum.join(",")}?json`);
    // Initialize a variable to store the JSON data from the response.
    let data = await res.json();
    // Iterate over the data object and log each fact to the console.
    for (let num in data) {
      console.log(data[num]);
    }
  } catch (err) {
    console.error("Error fetching multiple number facts:", err);
  }
}
// To call this function, use the following code:
// getMultipleNumFacts(); Note: favNum is an array of numbers and this function only accepts multiple numbers.

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It's okay if some of the facts are repeats. Note: You'll need to make multiple requests for this.

async function getMultipleFacts() {
  try {
    // Initialize a variable to store the response from the fetch request.
    // Use Promise.all to make multiple requests and wait for all of them to resolve before moving on.
    let res = await Promise.all(
      // Array.from() is used here to create an array of 4 fetch requests.
      Array.from({ length: 4 }, () => {
        // Return a fetch request for each favorite number.
        return fetch(`${baseURL}${favNum}?json`);
      })
    );
    // Initialize a variable to store the JSON data from the response.
    // Use Promise.all to wait for all of the JSON data to be resolved before moving on.
    // The map() method is used to iterate over the array of responses and return an array of JSON data.
    let data = await Promise.all(res.map((res) => res.json()));
    // Iterate over the data object and log each fact to the console.
    // Use forEach() to iterate over the array of JSON data and log the text property of each object to the console.
    data.forEach((data) => {
      console.log(data.text);
    });
  } catch (err) {
    console.error("Error fetching multiple facts of favorite number:", err);
  }
}
// To call this function, use the following code:
// getMultipleFacts(); Note: favNum is a global variable and this function only accepts one number.

// Part 2: Deck of Cards
// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and suit of the card (e.g. "5 of spades", "queen of diamonds"). https://deckofcardsapi.com/api/deck/new/draw/?count=1.

const deckURL = "https://deckofcardsapi.com/api/deck/new/draw/?count=1";

async function getCard() {
  try {
    // Initialize a variable to store the response from the fetch request.
    let result = await fetch(`${deckURL}`);
    // Initialize a variable to store the JSON data from the response.
    let data = await result.json();
    // Log the value and suit of the card to the console.
    console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
  } catch (err) {
    console.error("Error fetching card:", err);
  }
}
// To call this function, use the following code:
// getCard(); Note: This function only fetches one card. To fetch multiple cards, use the following function.

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. Once you have both cards, console.log the values and suits of both cards.

async function getTwoCards() {
  try {
    // Initialize a variable to store the response from the fetch request.
    let result = await fetch(`${deckURL}`);
    // Initialize a variable to store the JSON data from the response.
    let data = await result.json();
    // Initialize a variable to store the deck ID from the data object.
    let deckId = data.deck_id;
    // Initialize a variable to store the response from the fetch request.
    let result2 = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    // Initialize a variable to store the JSON data from the response.
    let data2 = await result2.json();
    // Log the values and suits of both cards to the console.
    console.log(`${data.cards[0].value} of ${data.cards[0].suit}`);
    console.log(`${data2.cards[0].value} of ${data2.cards[0].suit}`);
  } catch (err) {
    console.error("Error fetching two cards:", err);
  }
}
// To call this function, use the following code:
// getTwoCards(); Note: This function only fetches two cards.

// Created new "cardDraw.js" file and moved the above code to that file.

// Further Study (Optional) - Created new "pokemon.js" file and moved the below code to that file.
// 1. Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.
// 2. Once you have names and URLs for all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.
// 3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon's species URL (you should see a key of species in the data). Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found. Example, "ducklett: They are better at swimming than flying, and they happily eat their favorite food, peat moss, as they dive underwater."
// 4. BONUS Instead of relying on console.log, let's create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.
