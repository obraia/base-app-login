import React, { memo, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-native";

import { IReducers } from '../../interfaces';
import { Creators as navigationActions } from '../../store/ducks/navigation';

import Scanner from '../../components/scanner';
import BarcodeIcon from '../../components/svg/barcode';
import ConfirmButton from '../../components/confirmButton';

import {
  Container,
  InputGroup,
  Input,
  ScanButton,
} from './styles';

const SearchProduct = () => {
  // console.log('[Page render] Search product');

  const history = useHistory();

  const { theme } = useSelector((state: IReducers) => state.themeReducers);
  const { products } = useSelector((state: IReducers) => state.productsReducers);
  const dispatch = useDispatch();

  const [isCameraActivated, setIsCameraActivated] = useState(true);
  const [barcode, setBarcode] = useState('');

  const toggleCamera = () => { setIsCameraActivated(!isCameraActivated); }

  const searchByCode = () => {
    let index = 0;

    if (barcode && barcode !== '') {
      index = products.findIndex(product => (product.barcodeA == barcode || product.barcodeB == barcode));
    }

    if (index >= 0) {
      history.push('product/' + index + '/search');
      dispatch(navigationActions.goTo('Produto: ' + barcode));
    }
    else {
      Alert.alert('Produto não encontrado', `O código ${barcode} não foi encontrado na base de dados de produtos.`);
    }
  }

  return (
    <Container>
      <InputGroup>
        <Input placeholder={'Codigo do produto'}
          value={barcode}
          onChangeText={value => setBarcode(value)} />
        <ScanButton onPress={toggleCamera}>
          <BarcodeIcon fill={theme.colors.primary} />
        </ScanButton>
      </InputGroup>

      {isCameraActivated && <Scanner stateBarcode={{ barcode, setBarcode }} />}

      <ConfirmButton onPress={searchByCode} disabled={barcode === ''} text={'Buscar produto'} />

    </Container>
  );
}

export default memo(SearchProduct);