import httpClient from '../http-client';
import UserCartItem from '../models/userCartItem';

const addToCart = async (productId: number, quantity: number) => {
  return (
    await httpClient.post<UserCartItem>('/user_cart', { productId, quantity })
  ).data;
};

const getCartItems = async () => {
  return (await httpClient.get<UserCartItem[]>('/user_cart')).data;
};

const removeCartItem = async (userCartId: number) => {
  return (await httpClient.delete(`/user_cart/${userCartId}`)).data;
};

const updateCartItem = async (userCartId: number, quantity: number) => {
  return (await httpClient.patch(`/user_cart/${userCartId}`, { quantity }))
    .data;
};

export { addToCart, getCartItems, removeCartItem, updateCartItem };
