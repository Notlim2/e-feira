import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Card from '../components/Card';
import Product from '../models/product';
import { getProducts as getProductsService } from '../services/product';

const LandingPageContainer = styled.div``;

const OurProductsTitle = styled.h3`
  font-size: 1.25em;
`;

const ProductsList = styled.ul`
  margin: 16px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 16px;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ProductTitle = styled.h4`
  background: rgba(0, 0, 0, 0.4);
  color: #f2f2f2;
  padding: 4px;
  border-radius: 4px;
`;

const ProductDescription = styled.p`
  background: rgba(0, 0, 0, 0.4);
  color: #f2f2f2;
  padding: 4px;
  border-radius: 4px;
`;

const ProductPrice = styled.span`
  background: #2ecc71;
  color: #ecf0f1;
  font-weight: bold;
  font-size: 1em;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
`;

const ProductQuantity = styled.span`
  background: #e74c3c;
  color: #ecf0f1;
  font-weight: bold;
  font-size: 1em;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
`;

const ProductPriceAndQuantityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleAndSearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 2px black;
`;

const SearchTextInput = styled.input`
  outline: none;
  background: #ffffffaa;
  padding: 8px;
  margin: 4px;
  border: solid 1px #bbb;
  min-width: 300px;
  border-radius: 4px;
  font-size: 1.1em;
  color: #777;
`;

const LandingPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([] as Product[]);
  const history = useHistory();

  const goToProductPage = (productId: number) => {
    history.push(`/product/${productId}`);
  };

  const getProducts = useCallback(async () => {
    const products = await getProductsService();
    setProducts(products);
  }, [setProducts]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const filteredProducts = useMemo(() => {
    return products?.filter((prod) =>
      prod?.name?.toLocaleLowerCase()?.includes(searchText?.toLocaleLowerCase())
    );
  }, [products, searchText]);

  return (
    <LandingPageContainer>
      <TitleAndSearchContainer>
        <OurProductsTitle>Nossos produtos</OurProductsTitle>
        <SearchTextInput
          placeholder="Pesquisar..."
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </TitleAndSearchContainer>
      <ProductsList>
        {filteredProducts?.map((product) => (
          <Card
            thumbnail={product.thumbnail}
            onClick={() => goToProductPage(product.id)}
            key={product.id}
          >
            <ProductTitle>{product.name}</ProductTitle>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPriceAndQuantityContainer>
              <ProductPrice>
                R${' '}
                {new Intl.NumberFormat('pt-BR', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }).format(product.price)}
              </ProductPrice>
              <ProductQuantity>
                Disponível: {product.quantity} Kg
              </ProductQuantity>
            </ProductPriceAndQuantityContainer>
          </Card>
        ))}
      </ProductsList>
    </LandingPageContainer>
  );
};

export default LandingPage;
