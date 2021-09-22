import React, { useState } from 'react';
import styled from 'styled-components';
import showErrorMessage from '../helpers/show-error-message';
import { SignInData } from './AuthContextProvider';
import Button from './Button';
import Input from './Input';

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LoginButton = styled(Button)`
  background: #3498dbbb;
  color: white;
  font-weight: bold;

  :hover {
    background: #3498db;
  }
`;

interface LoginFormProps {
  signIn: (data: SignInData, ...rest: any[]) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ signIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signIn({ email, password });
    } catch (error) {
      showErrorMessage(error);
    }
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButton>Login</LoginButton>
    </LoginFormContainer>
  );
};

export default LoginForm;
