// VARIABILI
const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";
// const API_KEY = "qui inserisci la tua key";
const loader = document.querySelector(".loading");
const modalContent = document.querySelector(".modal-content");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");
// Array di oggetti con serie ed immagini
const characterImages = [
    { character: "Game of thrones", image: "./images/homer.png" },
    { character: "brooklyn 99", image: "./images/brooklyn.png" },
    { character: "Breaking Bad", image: "./images/walter.png" },
    { character: "Futurama", image: "./images/futurama.png" },
    { character: "scrubs", image: "./images/scrubs.png" },
    { character: "Stranger Things", image: "./images/strangerthings.png" },
    { character: "Dexter", image: "./images/dexter.svg" },
    { character: "Black Mirror", image: "./images/blackmirror.png" },
    { character: "Shameless", image: "./images/shameless.png" },
  ];

async function playCharacter(nameCharacter) {
    // 1. Loader
    loader.classList.remove("loading-hidden");
    // 2. Chiamare le API di Open AI
    const action = getRandomAction();
    const temperature = 0.7;
    // 3. Recuperare la risposta
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        }, 
        body: JSON.stringify({
            model: MODEL, 
            messages: [
                {
                    role: "user",
                    content:`Sei la serie tv ${nameCharacter} e ${action} con un massimo di 100 caratteri e in italiano`
                }
            ],
            temperature: temperature
        })
    })
    // 4. Interpretare risp in JSON
    const data = await response.json();
    // 5. Compilare la modale con i dati inseriti
    const message = data.choices[0].message.content;
    
    modalContent.innerHTML = `
    <h2 class="py-4 text-2xl font-extrabold leading-none tracking-tight">${nameCharacter}</h2>
    <p>${message}</p>
    `;
    loader.classList.add("loading-hidden");
    modal.classList.remove("modal-hidden");

}

function getRandomAction(){
    const actions = [
        'Dimmi una citazione iconica di un personaggio',
        'Dimmi la citazione più bella di un personaggio',
        'Dimmi la citazione più trise di un personaggio',
        'Dimmi la cosa più bella di un personaggio',

    ];
    const indexRandom = Math.floor(Math.random() * actions.length);
    return actions[indexRandom];
}

// Genera gli elementi delle immagini
const charactersContainer = document.querySelector(".characters");
characterImages.forEach((character) => {
  const characterDiv = document.createElement("div");
  characterDiv.classList.add("character");
  characterDiv.setAttribute("data-character", character.character);

  const image = document.createElement("img");
  image.src = character.image;
  image.alt = character.character;

  characterDiv.appendChild(image);
  charactersContainer.appendChild(characterDiv);
});

// Aggiungi gestori di eventi ai personaggi
const characters = document.querySelectorAll(".character");
characters.forEach(function(element) {
    element.addEventListener('click', function() {
        playCharacter(element.dataset.character);
    })
});


modalClose.addEventListener('click', function(){
    modal.classList.add("modal-hidden");
})

