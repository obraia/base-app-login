import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IReducers } from '../../interfaces';
import Product from '../product';


import SearchIcon from '../svg/search';
import ArrowLeftIcon from '../svg/arrow-left';
import ArrowRightIcon from '../svg/arrow-right';

import {
  Container,
  HeaderContainer,
  ContainerButton,
  SearchInput,
  PaginationDetails,
  WhiteSpace
} from './styles';

const ProductList = () => {
  // console.log('[Component render] Product list');

  const { theme } = useSelector((state: IReducers) => state.themeReducers);
  const { products } = useSelector((state: IReducers) => state.productsReducers);

  const [items, setItems] = useState(products);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(() => {
    setNumberOfPages(Math.round(items.length / productsPerPage));
  }, [items.length]);

  const filter = (value : string) => {
    const items = products.filter(item => item.description.toLowerCase().includes(value.toLowerCase()));
    setItems(items);
  }

  const nextPage = () => {
    if (pageNumber < numberOfPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  const previousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1)
    }
  }

  return (
    <Container>
      <HeaderContainer>
        <SearchInput placeholder={'Pesquisar'} onChangeText={value => filter(value)}/>
        <ContainerButton>
          <SearchIcon fill={theme.colors.primary} size={'15px'} />
        </ContainerButton>
      </HeaderContainer>

      {items.slice(pageNumber * productsPerPage, (pageNumber + 1) * productsPerPage).map((product, index) =>
        <Product key={index} product={product} index={(pageNumber * productsPerPage) + index} />
      )}

      <HeaderContainer>
        <PaginationDetails>Total: {items.length} - Página: {pageNumber + 1}/{numberOfPages + 1} </PaginationDetails>

        <ContainerButton onPress={previousPage} onLongPress={() => setPageNumber(0)}>
          <ArrowLeftIcon fill={theme.colors.primary} size={'25px'} />
        </ContainerButton>

        <ContainerButton onPress={nextPage} onLongPress={() => setPageNumber(numberOfPages)}>
          <ArrowRightIcon fill={theme.colors.primary} size={'25px'} />
        </ContainerButton>
      </HeaderContainer>

      <WhiteSpace />
    </Container>
  );
}

export default ProductList;