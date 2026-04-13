import Quotes from "@/quotes.json";
import { useAppSelector } from "@/store/store";

function QuoteContainer() {
  const mood = useAppSelector((state) => state.newLog.todayMood);
  const feels = useAppSelector((state) => state.newLog.todayFeels);
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
  const randomNumber = useAppSelector(
    (state) => state.ui.randomNumber,
  );
  const matchedQuote = Quotes.find(
    (quote) =>
      quote.mood_scale === mood &&
      [...quote.feels].sort().join(",") === [...feels].sort().join(","),
  );

  if (matchedQuote) {
    return (
      <p className="text-neutral-1  font-light text-[18px] leading-[1.3] italic md:text-start ">
        "{matchedQuote.quote}"
      </p>
    );
  } else {
    return (
      <div className="text-neutral-1 font-light text-[18px] leading-[1.3] italic">
        "{randomQuotes[randomNumber]}"
      </div>
    );
  }
}

export default QuoteContainer;
