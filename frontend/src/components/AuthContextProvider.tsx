import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import showErrorMessage from '../helpers/show-error-message';
import User from '../models/user';
import { signIn as signInService } from '../services/auth';
import LoginForm from './LoginForm';
import { hideModal, showModal } from './Modal';
import { getMe } from '../services/user';
import Swal from 'sweetalert2';

export interface SignInData {
  email: string;
  password: string;
}

const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const signIn = async ({ email, password }: SignInData) => {
    try {
      const { user, token } = await signInService(email, password);

      if (user) {
        setUser(user);
      }

      if (token) {
        window.localStorage.setItem('e-feira-token', token);
      }

      return true;
    } catch (error) {
      showErrorMessage(error);
      return false;
    }
  };

  const login = async () => {
    try {
      await new Promise((resolve, reject) => {
        const handleSignIn = async ({ email, password }: SignInData) => {
          const signedIn = await signIn({ email, password });

          if (!signedIn) {
            throw new Error('Usuário ou senha incorretos!');
          }

          resolve(undefined);
          hideModal();
        };

        showModal(
          'Entre com suas credenciais',
          <LoginForm signIn={handleSignIn} />,
          () => reject(undefined)
        );
      });

      Swal.fire({ icon: 'success', text: 'Login realizado com sucesso!' });

      return true;
    } catch (error) {
      if (error) {
        showErrorMessage(error);
      }

      return false;
    }
  };

  const logout = async () => {
    const result = await Swal.fire({
      icon: 'question',
      text: 'Tem certeza que deseja sair?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      setUser(undefined);
      localStorage.removeItem('e-feira-token');

      Swal.fire({ icon: 'success', text: 'Logout realizado com sucesso!' });
    }
  };

  const getUser = useCallback(async () => {
    try {
      const user = await getMe();
      setUser(user);
    } catch (error) {}
  }, []);

  const isAuthenticated = useMemo(() => {
    return !!user;
  }, [user]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
