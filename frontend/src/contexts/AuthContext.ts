import React from 'react';
import { SignInData } from '../components/AuthContextProvider';
import User from '../models/user';

interface IAuthContext {
  user: User | undefined;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<boolean>;
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext({} as IAuthContext);

export default AuthContext;
