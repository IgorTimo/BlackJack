import { useEffect, useState } from "react";
import styled from "styled-components";
import { calculateScore } from "../utils/calculateScore";

const GameControl = (props) => {
  const { playerCards, dealerCards, ...rest } = props;
  const [isEnough, setEnough] = useState(false);

  useEffect(() => {
    if (calculateScore(playerCards) > 21) {
      rest.onExceeds21();
    }
  });

  return (
    <ControlDiv>
      <ControlSpan>
        Your score: {calculateScore(playerCards)} Dealer score:{" "}
        {calculateScore(dealerCards)}
      </ControlSpan>
      {isEnough || (
        <>
          <ControlButton onClick={() => rest.onTakeCardClick()}>
            Take a card
          </ControlButton>
          <ControlButton
            onClick={() => {
              rest.onEnoughthClick();
              setEnough(true);
            }}
          >
            Enoughth
          </ControlButton>
        </>
      )}
    </ControlDiv>
  );
};

const ControlDiv = styled.div`
  ${"" /* background-color: red; */}
  text-align: center;
`;

const ControlSpan = styled.span`
  margin: 0 30px 0 0;
  font-size: 28px;
  font-weight: bold;
  color: white;
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

export default GameControl;
