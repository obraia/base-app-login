import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-native";

import { Creators as navigationActions } from '../../store/ducks/navigation';
import { IReducers, IProduct } from '../../interfaces';

import BarcodeIcon from '../../components/svg/barcode';

import { Container, Image, ProductBody, ProductHeader, ProductBarcode, ProductDescription, ProductQuantity, CountDate } from './styles';

const ProductList = (props: { product: IProduct, index: number }) => {

  const { theme } = useSelector((state: IReducers) => state.themeReducers);

  const dispatch = useDispatch();
  const history = useHistory();

  const goToProduct = () => {
    dispatch(navigationActions.goTo('Produto: ' + (props.product.barcodeA || props.product.barcodeB)));
    history.push('product/' + props.index);
  }

  const getQuantity = () => {
    let sum = 0;
    props.product.counts.forEach(count => sum += count.quantity);
    return sum;
  }

  const getLastCountDate = () => {
    const date = props.product.counts[props.product.counts.length - 1].date;
    if (date === '') return 'Contagem não realizada';
    else return date;
  }

  return (
    <Container onPress={goToProduct}>
      <Image>
        <BarcodeIcon fill={theme.colors.textBackground} size={'50%'} />
        <ProductQuantity>{getQuantity()}</ProductQuantity>
      </Image>
      <ProductBody>
        <ProductHeader>
          <ProductBarcode>{props.product.barcodeA || props.product.barcodeB}</ProductBarcode>
        </ProductHeader>
        <ProductDescription>{props.product.description}</ProductDescription>
        <CountDate>{getLastCountDate()}</CountDate>
      </ProductBody>
    </Container>
  );
}

export default ProductList;