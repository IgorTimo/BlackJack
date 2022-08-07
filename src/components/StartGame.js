import { useState } from "react";
import styled from "styled-components";

const StartGame = (props) => {
  const [bet, setBet] = useState(1);

  const handelPlusClick = () => {
    if (props.balance > bet) {
      setBet((bet) => bet + 1);
    }
  };

  const handlePlus10Click = () => {
    if (props.balance >= bet + 10) {
      setBet((bet) => bet + 10);
    }else{
      setBet(props.balance);
    }
  };

  const handelMinusClick = () => {
    if (bet > 1) {
      setBet((bet) => bet - 1);
    }
  };

  const handleMinus10Click = () => {
    if (bet > 10) {
      setBet((bet) => bet - 10);
    }else{
      setBet(0);
    }
  };

  return (
    <ControlDiv>
      <ControlSpan> Your balance: {props.balance} Enter your bet: </ControlSpan>

      <BetButton onClick={handleMinus10Click}>-10</BetButton>
      <BetButton onClick={handelMinusClick}>-</BetButton>
      <ControlH1 ref={props.betRef}>{bet}</ControlH1>
      <BetButton onClick={handelPlusClick}>+</BetButton>
      <BetButton onClick={handlePlus10Click}>+10</BetButton>

      <ControlButton onClick={() => props.onStartGameClick()}>
        Start game
      </ControlButton>
    </ControlDiv>
  );
};

const ControlDiv = styled.div`
  ${"" /* background-color: red;   */}
  margin-top:354px;
  text-align: center;
`;

const ControlSpan = styled.span`
  margin: 0 30px 0 0;
  font-size: 28px;
  font-weight: bold;
  color: white;
`;

//FIXME: почему-то он не вровень другим элементам
const ControlH1 = styled.h1`
  display: inline-block;
  color: white;
  font-size: 54px;
  font-weight: bold;
`;
const ControlButton = styled.button`
  font-size: 24px;
  font-weight: bold;
  height: 100px;
  width: 200px;
  margin: 20px;
  border-radius: 36px;
  color: white;
  background-color: purple;
`;

const BetButton = styled.button`
  font-size: 24px;
  font-weight: bold;
  height: 50px;
  width: 60px;
  margin: 20px 10px;
  border-radius: 36px;
  color: white;
  background-color: red;
`;

export default StartGame;
