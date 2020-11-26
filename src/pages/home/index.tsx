import React, { memo } from 'react';

import ProductList from '../../components/productList';

import { Container } from './styles';

const Home = () => {
  // console.log('[Page render] Home');

  return (
    <Container>
      <ProductList />
    </Container>
  );
}

export default memo(Home);