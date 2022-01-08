import styled from "styled-components";

const StartGame = (props) => {
  return (
    <ControlDiv>
      <ControlSpan>Enter your bet and press start</ControlSpan>
      <ControlInput
        type="number"
        min="1"
        max="10"
        placeholder="10"
      ></ControlInput>
      <ControlButton onClick={() => props.onStartGameClick()}>
        Start game
      </ControlButton>
    </ControlDiv>
  );
};

const ControlDiv = styled.div`
  ${"" /* background-color: red; */}
  margin-top:354px;
  text-align: center;
`;

const ControlSpan = styled.span`
  margin: 0 30px 0 0;
  font-size: 28px;
  font-weight: bold;
  color: white;
`;
const ControlInput = styled.input`
  margin: 30px 0 0 0;
  height: 100px;
  color: white;
  font-size: 54px;
  font-weight: bold;
  border: none;
  background-color: green;

  &:focus {
    outline: none;
  }
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

export default StartGame;
