const pokeUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1000";
let pokeNames = [];
let pokeUrls = [];

// Function to fetch the list of all Pokemon
async function getPokemon() {
  try {
    let response = await fetch(pokeUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    let results = data.results;
    // Store Pokemon names and URLs
    results.forEach((result) => {
      pokeNames.push(result.name);
      pokeUrls.push(result.url);
    });
  } catch (error) {
    console.error("There was an error getting pokemon", error);
  }
}

// Add event listener to the generate button
document
  .getElementById("generate-btn")
  .addEventListener("click", generatePokemon);

// Function to generate random Pokemon and display them
async function generatePokemon() {
  const pokemonContainer = document.getElementById("pokemon-container");
  const generateBtn = document.getElementById("generate-btn");
  pokemonContainer.innerHTML = ""; // Clear previous results
  generateBtn.disabled = true; // Disable button to prevent multiple clicks

  const promises = [];
  // Fetch details of 3 random Pokemon
  for (let i = 0; i < 3; i++) {
    const id = Math.floor(Math.random() * pokeUrls.length);
    promises.push(
      fetch(pokeUrls[id]).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    );
  }

  try {
    const results = await Promise.all(promises);
    const speciesPromises = results.map(async (pokemon) => {
      // Create and display Pokemon element
      const pokemonElement = makePokeCard(
        pokemon.name,
        pokemon.sprites.front_default,
        "Loading description..."
      );
      pokemonElement.querySelector("p").id = `description-${pokemon.name}`;
      pokemonContainer.appendChild(pokemonElement);

      try {
        // Fetch species data to get the description
        const speciesResponse = await fetch(pokemon.species.url);
        if (!speciesResponse.ok) {
          throw new Error(`HTTP error! status: ${speciesResponse.status}`);
        }
        const speciesData = await speciesResponse.json();
        const flavorTextEntry = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        const descriptionElement = document.getElementById(
          `description-${pokemon.name}`
        );
        // Display the description
        if (flavorTextEntry) {
          descriptionElement.textContent = flavorTextEntry.flavor_text;
        } else {
          descriptionElement.textContent = "No English description available";
        }
      } catch (error) {
        console.error(`Error fetching species data for ${pokemon.name}`, error);
      }
    });
    await Promise.all(speciesPromises);
  } catch (error) {
    console.error("Error fetching random pokemon", error);
  } finally {
    generateBtn.disabled = false; // Re-enable button after fetching
  }
}

// Function to create a Pokemon card
function makePokeCard(name, imgSrc, description) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <h1>${name}</h1>
        <img src="${imgSrc}" />
        <p>${description}</p>
    `;
  return card;
}

// Call getPokemon to populate pokeUrls before adding event listener
getPokemon();
