import React, { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import UserCartContext from '../contexts/UserCartContext';
import UserCartProduct from '../models/userCartProduct';
import { getCartItems as getCartItemsService } from '../services/userCart';
import { showModal } from './Modal';
import UserCartProducts from './UserCartProducts';

const UserCartContextProvider: React.FC = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const [userCartProducts, setUserCartProducts] = useState(
    [] as UserCartProduct[]
  );

  const updateUserCartProducts = useCallback(async () => {
    const userCartProducts = await getCartItemsService();
    setUserCartProducts(userCartProducts);
  }, [setUserCartProducts]);

  const showUserCartProducts = () => {
    showModal(
      'Carrinho de compras',
      <UserCartProducts userCartProducts={userCartProducts} />
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      updateUserCartProducts();
    }
  }, [updateUserCartProducts, isAuthenticated]);

  return (
    <UserCartContext.Provider
      value={{ userCartProducts, updateUserCartProducts, showUserCartProducts }}
    >
      {children}
    </UserCartContext.Provider>
  );
};

export default UserCartContextProvider;
