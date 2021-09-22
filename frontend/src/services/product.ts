import httpClient from '../http-client';

const getProducts = async () => {
  return (await httpClient.get(`/product`)).data;
};

const getProduct = async (productId: string) => {
  return (await httpClient.get(`/product/${productId}`)).data;
};

export { getProducts, getProduct };
