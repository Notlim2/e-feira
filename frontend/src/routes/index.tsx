import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import NotFound from '../pages/NotFound';
import ProductPage from '../pages/ProductPage';

const RoutesContainer = styled.div`
  flex: 1;
  background: #f1f2f6aa;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;

  display: flex;
  flex-direction: column;
`;

const Routes: React.FC = () => {
  return (
    <RoutesContainer className="content-container">
      <Switch>
        <Route path="/" exact component={LandingPage} />

        <Route path="/product/:productId" exact component={ProductPage} />

        <Route path="*" exact component={NotFound} />
      </Switch>
    </RoutesContainer>
  );
};

export default Routes;
