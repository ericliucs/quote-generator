const quote = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterButton = document.getElementById("twitter-button");

twitterButton.addEventListener("click", (event) => {
  const currentQuote = quote.innerText;
  const currentQuoteAuthor = quoteAuthor.innerText;
  console.log(currentQuote);
  console.log(currentQuoteAuthor);
});
