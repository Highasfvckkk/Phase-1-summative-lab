// DOM Elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultContainer = document.getElementById("result-container");
const errorMsg = document.getElementById("error-message");
const audioBtn = document.getElementById("audio-btn");

// Search Form
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const word = searchInput.value.trim();

  if (!word) {
    showError("Please enter a word");
    return;
  }

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`"${word}" not found`);
      }
      throw new Error("Unable to fetch word. Please try again later.");
    }

    const data = await response.json();
    displayResults(data[0]);
  } catch (err) {
    showError(err.message);
  }
});

// Display Results
function displayResults(data) {
  errorMsg.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  // Update word and phonetic
  document.getElementById("display-word").textContent = data.word;
  document.getElementById("phonetic").textContent = data.phonetic || "";

  // Update definitions
  const defContainer = document.getElementById("definitions");
  defContainer.innerHTML = data.meanings
    .map((meaning) => {
      const definitions = meaning.definitions
        .slice(0, 3)
        .map(
          (def) => `
        <div class="definition-item">
          <p class="definition-text">${def.definition}</p>
          ${def.example ? `<p class="example">"${def.example}"</p>` : ""}
        </div>
      `
        )
        .join("");

      return `
        <div class="meaning-block">
          <p class="part-of-speech">${meaning.partOfSpeech}</p>
          ${definitions}
        </div>
      `;
    })
    .join("");

  // Update synonyms
  const allSynonyms = [];
  data.meanings.forEach((meaning) => {
    if (meaning.synonyms && meaning.synonyms.length > 0) {
      allSynonyms.push(...meaning.synonyms);
    }
  });

  const synonymsSection = document.getElementById("synonyms-section");
  if (allSynonyms.length > 0) {
    const uniqueSynonyms = [...new Set(allSynonyms)].slice(0, 10);
    document.getElementById("synonyms").textContent = uniqueSynonyms.join(", ");
    synonymsSection.classList.remove("hidden");
  } else {
    synonymsSection.classList.add("hidden");
  }

  // Update audio button
  const audioData = data.phonetics.find((p) => p.audio);
  if (audioData) {
    const audio = new Audio(audioData.audio);
    audioBtn.onclick = () => audio.play();
    audioBtn.disabled = false;
  } else {
    audioBtn.disabled = true;
  }
}

// Error Handling
function showError(msg) {
  resultContainer.classList.add("hidden");
  errorMsg.classList.remove("hidden");
  errorMsg.innerHTML = `<p>${msg}</p>`;
}
