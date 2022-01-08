
import styled from "styled-components";


const Exceeds21 = (props) => {
return (
    <ControlDiv>
        <ControlSpan>Your cards exceeds 21! You loose!</ControlSpan>
        <ControlButton onClick={() => {props.onTryAgainClick()}}>Try again</ControlButton>
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

export default Exceeds21;
