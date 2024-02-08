const quoteContainer = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterButton = document.getElementById("twitter-button");
const generateQuoteButton = document.getElementById("generate-quote-button");
const loader = document.getElementById("loader");

let quoteObjectsArray = [{
  text: "If you judge people, you have no time to love them.",
  author: "Mother Teresa"
}, {
  text: "I’ve failed over and over and over again in my life and that is why I succeed.",
  author: "Michael Jordan"
}, {
  text: "I have learned over the years that when one’s mind is made up, this diminishes fear; knowing what must be" +
    " done does away with fear.",
  author: "Rosa Parks"
}, {
  text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  author: "Nelson Mandela"
}, {
  text: "Let the future tell the truth, and evaluate each one according to his work and accomplishments. The present" +
    " is theirs; the future, for which I have really worked, is mine.",
  author: "Nikola Tesla"
}, {
  text: "What you are is what you have been. What you'll be is what you do now.",
  author: "Buddha"
}];
let currentQuoteIndex = -1;

function showLoader() {
  loader.style.opacity = "1";
  quoteContainer.style.opacity = "0";
}

function hideLoader() {
  loader.style.opacity = "0";
  quoteContainer.style.opacity = "1";
}

async function getQuoteObjects() {
  showLoader();
  return fetch("https://jacintodesign.github.io/quotes-api/data/quotes.json")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return data;
      });
}

function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterURL, "_blank");
}

function selectNewRandomQuoteAndAuthor() {
  let randomQuoteIndex = Math.floor(Math.random() * quoteObjectsArray.length);
  while (randomQuoteIndex === currentQuoteIndex)
    randomQuoteIndex = Math.floor(Math.random() * quoteObjectsArray.length);
  currentQuoteIndex = randomQuoteIndex;

  let randomQuoteObject = quoteObjectsArray[randomQuoteIndex];
  let randomQuote;
  let randomAuthor;
  if (!Object.hasOwn(randomQuoteObject, "text") || !Object.hasOwn(randomQuoteObject, "author")) {
    randomQuote = "Oops! An error occurred while getting a random quote.";
    randomAuthor = "";
  } else {
     randomAuthor = randomQuoteObject.author;
     randomQuote = randomQuoteObject.text;
  }
  return [randomQuote, randomAuthor];
}

function applyQuoteAndAuthor(randomQuote, randomAuthor) {
  if (randomQuote.length > 80)
    quote.classList.add("long-quote");
  else
    quote.classList.remove("long-quote");
  quote.innerText = randomQuote;
  quoteAuthor.innerText = randomAuthor;
}

twitterButton.addEventListener("click", tweetQuote);

generateQuoteButton.addEventListener("click", () => {
  let [randomQuote, randomAuthor] = selectNewRandomQuoteAndAuthor();
  applyQuoteAndAuthor(randomQuote, randomAuthor);
});

getQuoteObjects().then(data => {
  quoteObjectsArray = [...quoteObjectsArray, ...data];
  generateQuoteButton.click();
  hideLoader();
});
