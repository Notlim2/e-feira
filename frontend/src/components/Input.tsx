import React, { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styled from 'styled-components';
import Button from './Button';

const InputContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  input {
    flex: 1;
    border: none;
    outline: none;
    border-bottom: solid 1px #ababab;
    padding: 8px 4px;
    color: #ababab;
    font-size: 1em;

    ::placeholder {
      color: #ababab;
    }
  }
`;

const ChangePasswordViewButton = styled(Button)`
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ style, type: initialType, ...rest }) => {
  const [type, setType] = useState<HTMLInputTypeAttribute>();

  const toogleInputType = () => {
    if (type !== 'password') {
      setType('password');
    } else {
      setType('text');
    }
  };

  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  return (
    <InputContainer style={style}>
      <input type={type} {...rest} />
      {initialType === 'password' && (
        <ChangePasswordViewButton type="button" onClick={toogleInputType}>
          {type === 'password' ? (
            <AiOutlineEye size={16} />
          ) : (
            <AiOutlineEyeInvisible size={16} />
          )}
        </ChangePasswordViewButton>
      )}
    </InputContainer>
  );
};

export default Input;
