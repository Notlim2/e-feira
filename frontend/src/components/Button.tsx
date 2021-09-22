import styled from 'styled-components';

const Button = styled.button`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  min-width: 40px;
  min-height: 40px;
  transition: all 0.5s;

  :hover {
    background: rgba(0, 0, 0, 0.1);
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Button;
