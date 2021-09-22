import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { AiOutlineUser } from 'react-icons/ai';
import { useHistory } from 'react-router';
import { BiCart } from 'react-icons/bi';
import AuthContext from '../contexts/AuthContext';
import UserCartContext from '../contexts/UserCartContext';

const HeaderContainer = styled.div`
  background: #f1f2f6aa;
  box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.3);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderTitle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  font-size: 1.6em;
  font-weight: bold;
  text-align: center;
`;

const HeaderButton = styled(Button)`
  border-radius: 20px;

  gap: 8px;
`;

const Header: React.FC = () => {
  const { user, login, logout, isAuthenticated } = useContext(AuthContext);
  const { showUserCartProducts } = useContext(UserCartContext);
  const history = useHistory();

  const goToLandingPage = () => {
    history.push(`/`);
  };

  return (
    <HeaderContainer>
      <HeaderContent className="content-container">
        <span></span>
        <HeaderTitle onClick={goToLandingPage}>E-feira</HeaderTitle>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HeaderButton
            onClick={isAuthenticated ? showUserCartProducts : login}
          >
            <BiCart size={16} />
          </HeaderButton>
          <HeaderButton onClick={isAuthenticated ? logout : login}>
            <AiOutlineUser size={16} />
            {user?.name}
          </HeaderButton>
        </span>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
