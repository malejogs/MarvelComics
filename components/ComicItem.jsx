import React from "react";
import styled from "styled-components";

const Item = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
`;

const Title = styled.h3`
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  z-index: 1;
  margin: 10px 0;
  padding: 0 5px;
  font-size: 16px;
  transition: all 0.3s ease;
  border-radius: 1px;
  ${Item}:hover & {
    color: var(--red);
    transform: translateY(-10px) scale(1.05);
  }
`;

const Cover = styled.div`
  position: relative;
  height: 324px;

  border-radius: 5px;
  img {
    border-radius: 5px;
  }

  transition: all 0.3s ease;
  ${Item}:hover & {
    transform: translateY(-7px) scale(1.03);
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    filter: brightness(1.2);
  }
`;

const Info = styled.p`
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  border-radius: 3px;
  bottom: -7px;
  width: 100%;
  font-weight: 100;
  font-size: 14px;
  background: var(--red);
  color: white;
  padding: 12px;
  left: -12px;
  margin: 0;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  transition: all 0.3s ease;
  ${Item}:hover & {
    padding: 0;
    left: 0;
    bottom: -25px;
    background: none;
    box-shadow: none;
    color: var(--black);
  }
`;

const ComicsList = ({
  comic: { title, images, thumbnail, creators, prices },
}) => {
  const image = images[0] ? images[0] : thumbnail;
  return (
    <Item>
      <Title>{title}</Title>
      <Cover>
        <img
          src={`${image.path}/portrait_incredible.${image.extension}`}
          alt={title}
          width={216}
          height={324}
          loading="lazy"
        />
        <Info>
          <i>{creators.items[0]?.name || "MARVEL"}</i>
          <b>${prices[0]?.price}</b>
        </Info>
      </Cover>
    </Item>
  );
};

export default ComicsList;
