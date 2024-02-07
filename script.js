const quote = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterButton = document.getElementById("twitter-button");
const generateQuoteButton = document.getElementById("generate-quote-button")

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
}];
let currentQuoteIndex = -1;

async function getQuoteObjects() {
  return fetch("https://type.fit/api/quotes")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return data;
      });
}

function selectNewRandomQuoteAndAuthor(quoteObjectsArray, currentQuoteIndex) {
  let randomQuoteIndex = Math.floor(Math.random() * quoteObjectsArray.length);
  while (randomQuoteIndex === currentQuoteIndex)
    randomQuoteIndex = Math.floor(Math.random() * quoteObjectsArray.length);

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
  if (randomQuote.length > 70)
    quote.classList.add("long-quote");
  else
    quote.classList.remove("long-quote");
  quote.innerText = randomQuote;
  quoteAuthor.innerText = randomAuthor;
}

twitterButton.addEventListener("click", () => {
  const currentQuote = quote.innerText;
  const currentQuoteAuthor = quoteAuthor.innerText;
});

generateQuoteButton.addEventListener("click", () => {
  let [randomQuote, randomAuthor] = selectNewRandomQuoteAndAuthor(quoteObjectsArray, currentQuoteIndex);
  applyQuoteAndAuthor(randomQuote, randomAuthor);
});

getQuoteObjects().then(data => {
  quoteObjectsArray = [...quoteObjectsArray, ...data];
});
