import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Product from '../models/product';
import UserCartProduct from '../models/userCartProduct';
import Input from './Input';
import { getProducts as getProductsService } from '../services/product';
import {
  updateCartItem as updateCartItemService,
  removeCartItem as removeCartItemService,
} from '../services/userCart';
import Button from './Button';
import { pdf } from '@react-pdf/renderer';
import CheckoutDocument from './CheckoutDocument';
import download from 'downloadjs';
import { getMe } from '../services/user';
import Swal from 'sweetalert2';
import Loading from './Loading';
import { hideModal } from './Modal';

const UserCartProductItemContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.6);
  padding: 8px;

  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const UserCartProductThumbnail = styled.img`
  max-width: 80px;
`;

const UserCartProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const UserCartProductTitle = styled.span``;

const UserCartProductPrice = styled.span``;

const UserCartProductTotalPrice = styled.span``;

interface UserCartProductItemProps {
  userCartProduct: UserCartProduct;
  product: Product;
}

const UserCartProductItem: React.FC<UserCartProductItemProps> = ({
  userCartProduct,
  product,
}) => {
  const [quantity, setQuantity] = useState<number | undefined>();

  const handleChangeQuantity = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quantity = event.target.value;

    await updateCartItemService(userCartProduct.id, +quantity || 0);

    setQuantity(quantity ? +quantity : undefined);
  };

  const productTotalPrice = useMemo(() => {
    return (quantity || 0) * product?.price;
  }, [product?.price, quantity]);

  useEffect(() => {
    setQuantity(userCartProduct.quantity);
  }, [userCartProduct]);

  return (
    <UserCartProductItemContainer>
      <UserCartProductThumbnail src={product.thumbnail} alt="foto do produto" />
      <UserCartProductDetails>
        <UserCartProductTitle>
          <strong>Nome: </strong> {product.name}
        </UserCartProductTitle>
        <UserCartProductPrice>
          <strong>Valor: </strong>
          R$ {new Intl.NumberFormat('pt-BR').format(product.price)}
        </UserCartProductPrice>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ whiteSpace: 'nowrap' }}>Quantidade (Kg): </strong>
          <Input
            value={quantity}
            type="number"
            onChange={handleChangeQuantity}
          />
        </div>
        <UserCartProductTotalPrice>
          <strong>Valor Total: </strong>
          R${' '}
          {new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(productTotalPrice)}
        </UserCartProductTotalPrice>
      </UserCartProductDetails>
    </UserCartProductItemContainer>
  );
};

const UserCartProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const UserCartProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  height: 70vh;
  width: 80vw;
  padding: 8px;
`;

const CheckoutButton = styled(Button)`
  flex: 1;
  width: 100%;
  background-color: #2ecc71cc;
  color: white;
  font-weight: bold;

  :hover {
    background-color: #2ecc71;
  }
`;

interface UserCartProductsProps {
  userCartProducts: UserCartProduct[];
}

const UserCartProducts: React.FC<UserCartProductsProps> = ({
  userCartProducts,
}) => {
  const [products, setProducts] = useState([] as Product[]);
  const [isLoading, setIsLoading] = useState(false);

  const checkout = async () => {
    const result = await Swal.fire({
      icon: 'question',
      text: 'Tem certeza que deseja finalizar a compra?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      setIsLoading(true);

      const products = await getProductsService();

      const userCartProductsWithProductInfo = getUserCartProductsWithProduct(
        userCartProducts,
        products
      );

      const user = await getMe();

      for (let userCartProduct of userCartProducts) {
        await removeCartItemService(userCartProduct.id);
      }

      const checkoutFileStream = await pdf(
        <CheckoutDocument
          userCartProductsWithProductInfo={userCartProductsWithProductInfo}
          user={user}
        />
      ).toBlob();

      download(checkoutFileStream, 'Comprovante');

      setIsLoading(false);

      Swal.fire({ icon: 'success', text: 'Compra finalizada com sucesso!' });

      hideModal();
    }
  };

  const getProducts = useCallback(async () => {
    const products = await getProductsService();
    setProducts(products);
  }, [setProducts]);

  const getUserCartProductsWithProduct = useCallback(
    (userCartProducts: UserCartProduct[], products: Product[]) => {
      return userCartProducts.map((ucp) => ({
        userCartProduct: ucp,
        product: products.find((p) => p.id === ucp.productId)!,
      }));
    },
    []
  );

  const userCartProductsWithProduct = useMemo(() => {
    if (products?.length && userCartProducts?.length) {
      return getUserCartProductsWithProduct(userCartProducts, products);
    }
  }, [userCartProducts, products, getUserCartProductsWithProduct]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <UserCartProductsContainer>
      {' '}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <UserCartProductsList>
            {userCartProductsWithProduct?.map((ucpp) => (
              <UserCartProductItem
                key={ucpp.product?.id}
                product={ucpp.product}
                userCartProduct={ucpp.userCartProduct}
              />
            ))}
          </UserCartProductsList>
          <CheckoutButton type="button" onClick={checkout}>
            Finalizar Compra
          </CheckoutButton>
        </>
      )}
    </UserCartProductsContainer>
  );
};

export default UserCartProducts;
