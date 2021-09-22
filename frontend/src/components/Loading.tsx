import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  min-height: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Spinner = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: solid 12px #ecf0f177;
  border-top: solid 12px #2980b9;
  animation: spin infinite 1s;
`;

const LoadingMessage = styled.p`
  font-size: 1em;
  font-weight: bold;
`;

const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <Spinner></Spinner>
      <LoadingMessage>Carregando...</LoadingMessage>
    </LoadingContainer>
  );
};

export default Loading;
