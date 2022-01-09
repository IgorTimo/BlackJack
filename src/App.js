import { useEffect, useState, useRef } from "react";
import Board from "./components/Board";
import styled from "styled-components";
import GameControl from "./components/GameControl";
import StartGame from "./components/StartGame";
import Exceeds21 from "./components/Exceeds21";
import { calculateScore } from "./utils/calculateScore";
import Results from "./components/Results";

// Правила Игры

/* Ошибочно считается, что цель заключается в том, чтобы набрать как можно больше очков, но не более 21. На самом деле цель — обыграть дилера (крупье)
 Значения очков каждой карты: от двойки до десятки — от 2 до 10 соответственно, у туза — 1 или 11 (11 пока общая сумма не больше 21, далее 1), 
 у т. н. картинок (король, дама, валет) — 10.
 Если у игрока и дилера число очков на руках равное, то такая ситуация называется «ровно»: за рубежом это называется — пуш (англ. push). 
 В такой ситуации все остаются при своих ставках, никто не выигрывает и не проигрывает. 
 Игроки до раздачи карт делают ставки. После того, как первая карта сдана, игрокам запрещается делать ставки.
Дилер раздаёт карты: по две карты каждому игроку, себе раздаёт одну карту. Все карты открываются сразу (видны и дилеру, и игроку).
Далее игрокам предлагается на выбор либо взять ещё карту (в таком случае игрок должен сказать дилеру «карту» или «ещё», англ. hit me), 
либо остаться при тех картах (и той сумме очков), которые у него на руке (в этом случае игрок должен сказать дилеру «достаточно» или «хватит»).
Если у игрока после взятия новой карты сумма очков превысит 21, то такая ситуация называется «перебор». Дилер произносит «много» и снимает ставку игрока в пользу казино.
После того, как все игроки завершили брать карты, дилер говорит «себе» и раздаёт карты себе. Общее правило блек-джека состоит в том, что дилер обязан остановиться, 
как только наберёт 17 очков или выше, и обязан брать, пока не достигнет (даже если у всех не перебравших меньше очков)
При окончательном подсчёте очков в конце раунда карты остальных игроков для вас значения не имеют, игра ведётся только против дилера, 
то есть сравниваются карты только игрока и дилера, карты и ставки параллельных игроков не учитываются.
*/

//Небольшое интро в сам код.

/* Весь стейт и вся логика написана в корневом компоненте App. Тут же свичом мы преребираем какой рендерится компонент в зависимости от статуса игры.
У игры 4 статутса
1. start
Фоном идёт подрузка новой колоды для игры. В это время игрок выбирает ставку и нажимает кнопку Start game. Если это первая игра, то балланс равен 100. 
Елси не первая, то сколько наиграл столько и есть.
2. play 
Открываются карты и у игрока две кнопки Take a card и Enougth c очевидным смыслом. В случае перебора выходит 3 статус exceeds21. Если игрок останавливается, то 
стэйт isDealerPlay меняется на true и во втором useEffect идёт игра диллера. По завершении игры диллера выходим в 4 статус results
3. exceeds21
Сообщение о переборе очков и кнопка начала новой игры
4. results
Сообщение об итогах и кнопка начала новой игры
*/

//Основной вопрос у меня по вёрстке элементов, а то и ведётся себя не пойми как(FIXME: коммент в StartGame) и выглядит так себе

function App() {
  

  const [cards, setCards] = useState([]); //Вся колода, 52 карты
  const [playerCards, setPlayerCards] = useState([]); //Карты игрока
  const [dealerCards, setDealerCards] = useState([]); //Карты дилера
  const [status, setStatus] = useState("start"); //Статус игры
  const [loader, setLoader] = useState(true); // Загрузилась ли колода
  const [isDealerPlay, setDealerPlay] = useState(false); // Пора ли диллеру играть
  const [balance, setBalance] = useState(100); // Общий баланс
  const [bet, setBet] = useState(0); //Текущая ставка

  const betRef = useRef(); //Реф на забор ставки из StartGame

  useEffect(() => { //грузим колоду карт
    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
      .then((response) => response.json())
      .then((data) => {
        setCards(data.cards);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoader(false));
  }, [loader]);

  useEffect(() => { //играем за дилера
    if (calculateScore(dealerCards) < 17 && isDealerPlay) {
      let timer = setTimeout(
        () => setDealerCards([...dealerCards, cards.shift()]),
        2000
      );

      return () => {
        clearTimeout(timer);
      };
    }
    if (calculateScore(dealerCards) > 16 && isDealerPlay) {
      calculateResults();
      setStatus("results");
    }
  }, [isDealerPlay, dealerCards]);

  const handleStartGameClick = () => {
    setBet(Number.parseInt(betRef.current.innerText));
    setPlayerCards([cards.shift(), cards.shift()]);
    setDealerCards([cards.shift()]);
    setStatus("play");
  };

  const handleTakeCardClick = () => {
    setPlayerCards([...playerCards, cards.shift()]);
  };

  const handleEnoughthClick = () => {
    setDealerPlay(true);
  };

  const handleExceeds21 = () => {
    setBalance(balance - bet);
    setStatus("exceeds21");
  };

  const handleTryAgainClick = () => {
    setLoader(true);
    setPlayerCards([]);
    setDealerCards([]);
    setStatus("start");
    setDealerPlay(false);
  };

  const calculateResults = () => {
    const resultOfDealer = calculateScore(dealerCards);
    const resultOfPlayer = calculateScore(playerCards);

    if (resultOfDealer < 22 && resultOfDealer > resultOfPlayer) {
      setBalance(balance - bet);
    } else if (resultOfDealer !== resultOfPlayer) {
      setBalance(balance + bet);
    }
  };

  let renderItem; //сюда свичом будем присваиваь элемент в зависимости от статуса игры
  switch (status) {
    case "start":
      renderItem = loader ? (
        "Loading..."
      ) : (
        <StartGame
          balance={balance}
          betRef={betRef}
          onStartGameClick={handleStartGameClick}
        />
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
      renderItem = (
        <Exceeds21
          balance={balance}
          bet={bet}
          onTryAgainClick={handleTryAgainClick}
        />
      );
      break;
    case "results":
      renderItem = (
        <Results
          resultOfPlayer={calculateScore(playerCards)}
          resultOfDealer={calculateScore(dealerCards)}
          onTryAgainClick={handleTryAgainClick}
        />
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
  ${"" /* background-color: green; */}
  background-image: url(./images/sukno.jpeg);
  height: 1000px;
  width: max-width;
  padding: 20px 0;
`;

export default App;
