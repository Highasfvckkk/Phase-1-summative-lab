const searchForm = document.getElementById("search-form");
const resultContainer = document.getElementById("result-container");
const errorMsg = document.getElementById("error-message");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const word = document.getElementById("search-input").value;

  if (!word) return;

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) throw new Error("Word not found");

    const data = await response.json();
    displayResults(data[0]);
  } catch (err) {
    showError(err.message);
  }
});

function displayResults(data) {
  errorMsg.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  document.getElementById("display-word").innerText = data.word;
  document.getElementById("phonetic").innerText = data.phonetic || "";

  const defContainer = document.getElementById("definitions");
  defContainer.innerHTML = data.meanings
    .map(
      (meaning) => `
        <div class="meaning-block">
            <p class="part-of-speech">${meaning.partOfSpeech}</p>
            <p>${meaning.definitions[0].definition}</p>
            ${
              meaning.definitions[0].example
                ? `<p style="color: #666">" ${meaning.definitions[0].example} "</p>`
                : ""
            }
        </div>
    `
    )
    .join("");

  const audioData = data.phonetics.find((p) => p.audio !== "");
  const audioBtn = document.getElementById("audio-btn");
  if (audioData) {
    audioBtn.classList.remove("hidden");
    const audio = new Audio(audioData.audio);
    audioBtn.onclick = () => audio.play();
  } else {
    audioBtn.classList.add("hidden");
  }
}

function showError(msg) {
  resultContainer.classList.add("hidden");
  errorMsg.classList.remove("hidden");
  errorMsg.innerHTML = `<p style="color: red;">${msg}. Please try again.</p>`;
}
