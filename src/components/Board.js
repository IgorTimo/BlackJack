import styled from "styled-components";

const Board = (props) => {
  return (
    <BoardUl>
      {props.cards.map((card) => (
        <BoardLi key={card.code}>
          <BoardImg src={card.image} alt={card.code} />
          <br />
          <BoardSpan>
            {card.value} of {card.suit}
          </BoardSpan>{" "}
        </BoardLi>
      ))}
    </BoardUl>
  );
};

const BoardUl = styled.ul`
  text-align: center;
  padding: 0;
`;

const BoardLi = styled.li`
  display: inline-block;
  margin: 0 20px;
`;

const BoardImg = styled.img`
  display: inline-block;
`;

const BoardSpan = styled.span`
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  ${"" /* text-align: center; */}
`;

export default Board;
