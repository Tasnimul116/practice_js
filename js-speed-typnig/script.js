const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const qouteDisplayElement = document.getElementById("quoteDisplay");
const qouteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

qouteInputElement.addEventListener("input", () => {
  const arrayQoute = qouteDisplayElement.querySelectorAll("span");
  const arrayValue = qouteInputElement.value.split("");
  let correct = true;
  arrayQoute.forEach((characterSpan, index) => {
    const character = arrayValue[index];

    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) renderNewQoute();
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQoute() {
  const qoute = await getRandomQuote();
  qouteDisplayElement.innerHTML = "";
  qoute.split("").forEach((character) => {
    const characterSpan = document.createElement("span");

    characterSpan.innerText = character;
    qouteDisplayElement.appendChild(characterSpan);
  });
  qouteInputElement.value = null;
  startTimer();
}

let startTime;

function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText=getTimerTime();
  }, 1000);
}

function getTimerTime(){
   return Math.floor((new Date() - startTime)/1000)
}
renderNewQoute();
