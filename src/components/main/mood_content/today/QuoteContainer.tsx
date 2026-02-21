import Quotes from "@/quotes.json";

function QuoteContainer({ mood, feels }) {
  const randomQuotes = [
    "Feelings are visitors — let them come and go.",
    "This too shall pass.",
    "Even the darkest night will end and the sun will rise.",
    "Inhale confidence, exhale doubt.",
    "Storms make trees take deeper roots.",
    "You are not your thoughts.",
    "There’s strength in feeling deeply.",
    "Healing isn’t linear.",
    "Small steps still move you forward.",
    "Your story is still unfolding.",
  ];
  const randomNumber = Math.floor(Math.random() * 11);
  let selectQuote;
  const quoteSwitch = Quotes.map((quote) => {
    if (quote.mood_scale === mood) {
      if (
        [...quote.feels].sort((a, b) => a - b).join(",") ===
        [...feels].sort((a, b) => a - b).join(",")
      ) {
        selectQuote = quote.quote;
        return (
          <p className="text-neutral-1  font-light text-[18px] leading-[1.3] italic md:text-start ">
            "{selectQuote}"
          </p>
        );
      }
    }
  });
  if (selectQuote) {
    return quoteSwitch;
  } else {
    return (
      <div className="text-neutral-1 font-light text-[18px] leading-[1.3] italic">
        "{randomQuotes[randomNumber]}"
      </div>
    );
  }
}

export default QuoteContainer;
