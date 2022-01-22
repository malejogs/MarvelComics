import React from "react";
import ComicItem from "./ComicItem";
import styled from "styled-components";

const List = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  justify-content: space-around;
  gap: 50px 30px;
  padding: 20px 5%;
`;

const ComicsList = ({ comics }) => (
  <List>
    {comics.map(({ id, ...comic }) => (
      <ComicItem key={id} comic={comic} />
    ))}
  </List>
);

export default ComicsList;
