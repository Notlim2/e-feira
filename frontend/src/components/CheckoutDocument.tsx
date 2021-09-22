import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import Product from '../models/product';
import UserCartProduct from '../models/userCartProduct';
import User from '../models/user';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '24pt',
  },
  productView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexGrow: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  productThumbnail: {
    width: '96pt',
  },
  orderInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4pt',
  },
  alignCenter: {
    width: '100%',
    textAlign: 'center',
  },
});

interface ProductViewProps {
  userCartProductWithProductInfo: {
    userCartProduct: UserCartProduct;
    product: Product;
  };
}

const ProductView: React.FC<ProductViewProps> = ({
  userCartProductWithProductInfo,
}) => {
  return (
    <View style={styles.productView}>
      <Image
        style={styles.productThumbnail}
        src={{
          uri: userCartProductWithProductInfo.product.thumbnail,
          method: 'GET',
          headers: '',
          body: '',
        }}
      />
      <View>
        <Text>Nome: </Text>
        <Text>{userCartProductWithProductInfo.product.name}</Text>
      </View>
      <View>
        <Text style={styles.bold}>Valor:</Text>
        <Text>
          R${' '}
          {new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(userCartProductWithProductInfo.product.price)}
        </Text>
      </View>
      <View>
        <Text style={styles.bold}>Quantidade:</Text>
        <Text>
          {new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(
            userCartProductWithProductInfo.userCartProduct.quantity
          )}{' '}
          Kg
        </Text>
      </View>
      <View>
        <Text style={styles.bold}>Valor Total:</Text>
        <Text>
          R${' '}
          {new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(
            userCartProductWithProductInfo.userCartProduct.quantity *
              userCartProductWithProductInfo.product.price
          )}
        </Text>
      </View>
    </View>
  );
};

interface CheckoutDocumentProps {
  userCartProductsWithProductInfo: {
    userCartProduct: UserCartProduct;
    product: Product;
  }[];
  user: User;
}

const CheckouDocument: React.FC<CheckoutDocumentProps> = ({
  userCartProductsWithProductInfo,
  user,
}) => {
  const numberOfProductsPerPage = 5;
  const numberOfPagesToBeRendered = Math.ceil(
    userCartProductsWithProductInfo.length / numberOfProductsPerPage
  );

  const totalValue = userCartProductsWithProductInfo
    .map((ucpp) => ucpp.product.price * ucpp.userCartProduct.quantity)
    .reduce((a, b) => a + b);

  return (
    <Document>
      {Array(numberOfPagesToBeRendered)
        .fill('')
        .map((_, index) => {
          const isFirstPage = index === 0;
          const isLastPage = index === numberOfPagesToBeRendered - 1;
          const startIndex = index * numberOfProductsPerPage;

          const thisPageItems = [...userCartProductsWithProductInfo].splice(
            startIndex,
            numberOfProductsPerPage
          );

          return (
            <Page size="A4" orientation="landscape" style={styles.page}>
              {isFirstPage && (
                <View style={styles.orderInfo}>
                  <Text style={styles.alignCenter}>
                    Pedido N° {Math.ceil(Math.random() * 100)}
                  </Text>
                  <Text style={styles.alignCenter}>
                    Vendido para {user.name} -{' '}
                    {new Intl.DateTimeFormat('pt-BR', {
                      dateStyle: 'full',
                      timeStyle: 'short',
                    }).format(new Date())}
                  </Text>
                </View>
              )}
              {thisPageItems?.map((ucpp) => (
                <ProductView
                  key={ucpp.product.id}
                  userCartProductWithProductInfo={ucpp}
                />
              ))}
              {isLastPage && (
                <View>
                  <Text style={styles.alignCenter}>
                    Valor Total: R${' '}
                    {new Intl.NumberFormat('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(totalValue)}
                  </Text>
                </View>
              )}
            </Page>
          );
        })}
    </Document>
  );
};

export default CheckouDocument;
