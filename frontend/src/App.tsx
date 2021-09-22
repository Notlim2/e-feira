import React from 'react';
import styled from 'styled-components';
import AuthContextProvider from './components/AuthContextProvider';
import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './routes';
import background from './assets/background.jpg';
import { BrowserRouter as Router } from 'react-router-dom';
import ModalContainer from './components/ModalContainer';
import UserCartContextProvider from './components/UserCartContextProvider';

const AppContainer = styled.div`
  background: url(${background});
  background-attachment: fixed;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;

  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Router>
        <AppContainer>
          <UserCartContextProvider>
            <Header />
            <Routes />
            <Footer />
          </UserCartContextProvider>
        </AppContainer>
        <ModalContainer />
      </Router>
    </AuthContextProvider>
  );
};

export default App;
