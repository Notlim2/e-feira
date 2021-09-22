import clamp from 'clamp-js';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

const CardContainer = styled.button`
  position: relative;
  border-radius: 4px;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.3);
  padding: 16px;
  width: 300px;
  background: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  outline: none;
  transition: all 0.5s;

  :hover {
    background-color: rgba(0,0,0,0.4);
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 4px;
`;

interface CardProps {
  thumbnail?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ thumbnail, children, onClick }) => {
  const cardContainer = useRef<HTMLButtonElement>(null);

  const configureMaxRows = useCallback(() => {
    if (!cardContainer.current) {
      return;
    }

    const cardChildren = Array.from(cardContainer.current.children);
    for (let child of cardChildren) {
      const tagsToConfigure = ['span', 'p', 'h2', 'h3', 'h4', 'h5', 'h6'];
      if (tagsToConfigure.includes(child.tagName?.toLocaleLowerCase())) {
        clamp(child as HTMLElement, { clamp: 3 });
      }
    }
  }, [cardContainer]);

  useEffect(() => {
    configureMaxRows();
  }, [configureMaxRows]);

  return (
    <CardContainer
      ref={cardContainer}
      style={{
        backgroundImage: `url(${thumbnail})`,
        cursor: onClick ? 'pointer' : 'initial',
      }}
      onClick={onClick}
    >
      {children}
    </CardContainer>
  );
};

export default Card;
