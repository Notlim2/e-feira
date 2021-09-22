import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  min-height: 32px;
  background: #2c3e50;
  color: #ecf0f1;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.3);
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent className="content-container">
        <h4>E-feira</h4>
        <p>Feira eletrônica livre!</p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
