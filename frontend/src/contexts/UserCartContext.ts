import React from 'react';
import UserCartProduct from '../models/userCartProduct';

interface IUserCartContext {
  userCartProducts: UserCartProduct[];
  updateUserCartProducts: () => Promise<void>;
  showUserCartProducts: () => void;
}

const UserCartContext = React.createContext({} as IUserCartContext);

export default UserCartContext;
