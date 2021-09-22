import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Product from '../models/product';
import { getProduct as getProductService } from '../services/product';
import {
  addToCart as addToCartService,
  getCartItems as getCartItemsService,
} from '../services/userCart';
import { BiCart } from 'react-icons/bi';
import showErrorMessage from '../helpers/show-error-message';
import Swal from 'sweetalert2';
import AuthContext from '../contexts/AuthContext';
import UserCartContext from '../contexts/UserCartContext';

const ProductPageContainer = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 65% calc(35% - 16px);
  gap: 16px;
  flex: 1;

  @media (max-width: 900px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }
`;

const ProductThumbnail = styled.img`
  max-height: 300px;
  max-width: 100%;
  align-self: center;
`;

const ProductName = styled.h2`
  margin-bottom: 8px;
  border-bottom: solid 2px white;
`;

const ProductDescription = styled.p`
  font-size: 1.2em;
`;

const ProductPrice = styled.span`
  background: #2ecc71;
  color: #ecf0f1;
  font-weight: bold;
  font-size: 1em;
  text-align: center;
  padding: 8px;
  border-radius: 4px;
`;

const ProductQuantity = styled.span`
  background: #e74c3c;
  color: #ecf0f1;
  font-weight: bold;
  font-size: 1em;
  text-align: center;
  padding: 8px;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.6);
  padding: 16px;
  border-radius: 4px;
  color: white;
`;

const ProductSaleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: rgba(0, 0, 0, 0.6);
  padding: 16px;
  border-radius: 4px;
  color: white;
`;

const QuantityAndPriceContainer = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`;

const AddToCartContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AddToCartButton = styled(Button)`
  background: #2ecc71aa;
  color: #ecf0f1;
  font-weight: bold;
  font-size: 1.2em;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;

  :hover {
    background: #2ecc71ff;
  }
`;

interface ProductPageParams {
  productId: string;
}

const ProductPage: React.FC = () => {
  const { updateUserCartProducts } = useContext(UserCartContext);
  const { isAuthenticated, login } = useContext(AuthContext);
  const { productId } = useParams<ProductPageParams>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [addedToCart, setAddedToCart] = useState(false);

  const getProduct = useCallback(async () => {
    if (!productId) {
      return;
    }

    const product = await getProductService(productId);
    setProduct(product);
  }, [setProduct, productId]);

  const checkIfIsAddedToCart = useCallback(async () => {
    const userCartItems = await getCartItemsService();
    if (userCartItems?.length && product?.id) {
      const productIsInCart = userCartItems
        .map((ci) => ci.productId)
        .includes(product!.id);

      setAddedToCart(productIsInCart);
    }
  }, [setAddedToCart, product]);

  const handleAddToCart = async () => {
    try {
      let loggedIn = isAuthenticated;
      if (!isAuthenticated) {
        loggedIn = await login();
      }

      if (loggedIn) {
        await addToCart();
      }
    } catch (error) {
      if (error) {
        showErrorMessage(error);
      }
    }
  };

  const addToCart = async () => {
    try {
      await addToCartService(product!.id, 1);

      setAddedToCart(true);

      await updateUserCartProducts();

      Swal.fire({ icon: 'success', text: 'Item adicionado ao carrinho!' });
    } catch (error) {
      showErrorMessage(error);
    }
  };

  useEffect(() => {
    checkIfIsAddedToCart();
  }, [checkIfIsAddedToCart]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <ProductPageContainer>
      {product ? (
        <>
          <ProductInfo>
            <ProductThumbnail src={product.thumbnail} />
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
          </ProductInfo>
          <ProductSaleInfo>
            <AddToCartContainer>
              <AddToCartButton
                onClick={!addedToCart ? handleAddToCart : undefined}
                style={{ backgroundColor: addedToCart ? '#e74c3c' : undefined }}
              >
                {addedToCart ? (
                  <span>Adicionado ao carrinho</span>
                ) : (
                  <>
                    <span>Adicionar ao carrinho</span>
                    <BiCart size={24} />
                  </>
                )}
              </AddToCartButton>
            </AddToCartContainer>
            <QuantityAndPriceContainer>
              <ProductPrice>
                R${' '}
                {new Intl.NumberFormat('pt-BR', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }).format(product.price)}
              </ProductPrice>
              <ProductQuantity>
                Disponível {product.quantity} Kg
              </ProductQuantity>
            </QuantityAndPriceContainer>
          </ProductSaleInfo>
        </>
      ) : (
        <Loading />
      )}
    </ProductPageContainer>
  );
};

export default ProductPage;
