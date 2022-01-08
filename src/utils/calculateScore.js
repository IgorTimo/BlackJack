export function calculateScore(cards) {
  return cards.reduce((acc, card) => {
    if (
      card.code.charAt(0) === "K" ||
      card.code.charAt(0) === "Q" ||
      card.code.charAt(0) === "J" ||
      card.code.charAt(0) === "0"
    ) {
      return (acc += 10);
    }
    if (card.code.charAt(0) === "A" && acc < 11) {
      return (acc += 11);
    }
    if (card.code.charAt(0) === "A" && acc >= 11) {
      return (acc += 1);
    }

    return (acc += Number.parseInt(card.code.charAt(0)));
  }, 0);
}
