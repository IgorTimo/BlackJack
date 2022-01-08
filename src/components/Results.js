import styled from "styled-components";

const Results = (props) => {
  const { resultOfDealer, resultOfPlayer, ...rest } = props;

  let resultMessage;
  if (resultOfDealer < 22 && resultOfDealer > resultOfPlayer) {
    resultMessage = `You loose! Dealer score: ${resultOfDealer} Your score: ${resultOfPlayer}`;
  } else if (resultOfDealer === resultOfPlayer) {
    resultMessage = `Draw! Both have ${resultOfDealer}`;
  } else {
    resultMessage = `You win! Dealer score: ${resultOfDealer} Your score: ${resultOfPlayer}`;;
  }

  return (
    <ControlDiv>
      <ControlSpan>{resultMessage}</ControlSpan>
      <ControlButton
        onClick={() => {
          rest.onTryAgainClick();
        }}
      >
        Try again
      </ControlButton>
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

export default Results;
