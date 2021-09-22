import React from 'react';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-grow: 1;

  h2 {
    font-size: 1.6em;
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <h2>A página que você procura não foi encontrada!</h2>
    </NotFoundContainer>
  );
};

export default NotFound;
