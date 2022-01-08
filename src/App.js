import { useEffect, useState } from "react";
import Board from "./components/Board";
import styled from "styled-components";
import GameControl from "./components/GameControl";
import StartGame from "./components/StartGame";
import Exceeds21 from "./components/Exceeds21";
import { calculateScore } from "./utils/calculateScore";
import Results from "./components/Results";

function App() {
  // start, play, exceeds21, results

  const [cards, setCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [status, setStatus] = useState("start");
  const [loader, setLoader] = useState(true);
  const [isDealerPlay, setDealerPlay] = useState(false);



  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.cards);
        setCards(data.cards);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoader(false));
  }, [loader]);

  useEffect(() => {
    if (calculateScore(dealerCards) < 18 && isDealerPlay) {
      let timer = setTimeout(
        () => setDealerCards([...dealerCards, cards.shift()]),
        2000
      );

      return () => {
        clearTimeout(timer);
      };
    }
    if (calculateScore(dealerCards) > 16 && isDealerPlay) {
      setStatus("results");
    }
  }, [isDealerPlay, dealerCards]);

  const handleStartGameClick = () => {
    console.log("handleStartGameClick");
    setPlayerCards([cards.shift(), cards.shift()]);
    setDealerCards([cards.shift()]);
    setStatus("play");
  };

  const handleTakeCardClick = () => {
    console.log("handleTakeCardClick");
    setPlayerCards([...playerCards, cards.shift()]);
  };

  const handleEnoughthClick = () => {
    console.log("handleEnoughthClick");
    setDealerPlay(true);
  };

  const handleExceeds21 = () => {
    console.log("handleExceeds21");
    setStatus("exceeds21");
  };

  const handleTryAgainClick = () => {
    console.log("handleTryAgainClick");
    setLoader(true);
    setPlayerCards([]);
    setDealerCards([]);
    setStatus("start");
    setDealerPlay(false);
  };

  const handleDealerGame = () => {};

  let renderItem;
  switch (status) {
    case "start":
      renderItem = loader ? (
        "Loading..."
      ) : (
        <StartGame onStartGameClick={handleStartGameClick} />
      );
      break;
    case "play":
      renderItem = (
        <GameControl
          playerCards={playerCards}
          dealerCards={dealerCards}
          onTakeCardClick={handleTakeCardClick}
          onEnoughthClick={handleEnoughthClick}
          onExceeds21={handleExceeds21}
        />
      );
      break;
    case "exceeds21":
      renderItem = <Exceeds21 onTryAgainClick={handleTryAgainClick} />;
      break;
    case "results":
      renderItem = (
        <Results resultOfDealer={calculateScore(dealerCards)} resultOfPlayer={calculateScore(playerCards)}  onTryAgainClick={handleTryAgainClick} />
      );
      break;
    default:
      renderItem = null;
  }

  return (
    <>
      <ClothDiv>
        <Board cards={dealerCards} />
        {renderItem}
        <Board cards={playerCards} />
      </ClothDiv>
    </>
  );
}

const ClothDiv = styled.div`
  background-color: green;
  ${"" /* background-image: url(./src/images/sukno.jpeg); */}
  height: 1000px;
  ${"" /* FIXME: там ещё и белые полоски сверху ну куда это вообще */}
  width: max-width;
  padding: 20px 0;
`;

export default App;
