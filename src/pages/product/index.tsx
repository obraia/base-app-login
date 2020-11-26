import React, { memo, useMemo, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory, useParams } from "react-router-native";

import { IReducers, IProduct } from '../../interfaces';
import { Creators as productsActions } from '../../store/ducks/products';
import { Creators as navigationActions } from '../../store/ducks/navigation';

import ArrowRight from '../../components/svg/arrow-right';
import ArrowLeft from '../../components/svg/arrow-left';
import ConfirmButton from '../../components/confirmButton';

import {
  Container,
  InputGroup,
  Textarea,
  CountListContainer,
  CountItemButton,
  CountItemText,
  CountWhiteSpace,
  InputQuantity,
  ControlQuantityButton,
} from './styles';

const Product = () => {
  // console.log('[Page render] Product');

  const { index, previous } = useParams();
  const history = useHistory();

  const { theme } = useSelector((state: IReducers) => state.themeReducers);
  const { products } = useSelector((state: IReducers) => state.productsReducers);
  const dispatch = useDispatch();

  const [product, setProduct] = useState<IProduct>({ ...products[index] });
  const [productQuantity, setProductQuantity] = useState(0);
  const [hadDeletes, setHadDeletes] = useState(false);
  const [deletedAll, setDeletedAll] = useState(false);

  const setQuantity = (value: Number) => {
    const newValue = Number(productQuantity) + Number(value);
    if (newValue >= 0 && newValue <= 9999) setProductQuantity(newValue);
  }

  const setDirectQuantity = (value: string) => {
    const quantity = isNaN(Number(value)) ? 0 : Number(value);
    setProductQuantity(quantity);
  }

  const deleteCountByIndex = (indexCount: number) => {
    Alert.alert("Atenção!", "Tem certeza que deseja apagar a contagem?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Sim", onPress: () => confirmDelete() }
    ]);

    const confirmDelete = () => {
      const newProduct: IProduct = { ...product, counts: [...product.counts]};
      newProduct.counts.splice(indexCount, 1);

      if (newProduct.counts.length === 0) {
        newProduct.counts.push({ date: '', quantity: 0, timestamp: -8640000000000000 });
        setDeletedAll(true);
      }

      setProduct(newProduct);
      setHadDeletes(true);
    }
  }

  const getTotalCounts  = () => {
    let total = 0;
    product.counts.forEach(count => total += count.quantity);
    return total; 
  }

  const confirmChanges = () => {

    const isCount = productQuantity > 0;

    if (isCount) {
      const updatedCount = {
        quantity: productQuantity,
        date: moment().format("DD/MM/YYYY HH:mm"),
        timestamp: new Date().getTime()
      };

      if (product?.counts[0].quantity === 0) product.counts[0] = updatedCount;
      else product?.counts.push(updatedCount);
    }

    dispatch(productsActions.updateProduct(product, index, isCount, !isCount && deletedAll));

    // Verificar se valor contado até o momento é maior que o mínimo esperado para o produto
    const totalCounts = getTotalCounts();
    let aditionalMessage = '';
    let messageTitle = 'Sucesso!';
    
    if (totalCounts != product.expectedCount) {
      aditionalMessage = `\n\nA contagem total esperada para esse produto é de ${product.expectedCount}.`;
      messageTitle = 'Atenção!'
    }

    Alert.alert(messageTitle, `Contagem do produto ${product?.barcodeA || product?.barcodeB} salva com sucesso.` + aditionalMessage);

    if (previous == 'search') {
      dispatch(navigationActions.goTo('Buscar produto'));
      history.push('/search');
    } else {
      dispatch(navigationActions.goTo('Estoque'));
      history.push('/');
    }
  }

  const descriptionComponent = useMemo(() => (
    <Textarea placeholder={'Descrição do produto'}
      multiline={true}
      numberOfLines={4}
      value={product?.description}
      editable={false}
      textAlignVertical="top" />
  ), [product]);

  const counstComponent = useMemo(() => (
    product?.counts.filter(count => count.quantity > 0).map((count, index) => (
      <CountItemButton key={index} onLongPress={() => deleteCountByIndex(index)}>
        <CountItemText>
          Quantidade: {count.quantity} - Data: {count.date}
        </CountItemText>
      </CountItemButton>
    ))
  ), [product]);

  return (
    <Container>
      {descriptionComponent}
      <CountListContainer>
        <CountItemText>Todas as contagens</CountItemText>
        {counstComponent}
        <CountWhiteSpace />
      </CountListContainer>
      <InputGroup>
        <ControlQuantityButton onPress={() => setQuantity(-1)}>
          <ArrowLeft fill={theme.colors.primary} />
        </ControlQuantityButton>
        <InputQuantity
          keyboardType='numeric'
          maxLength={4}
          value={productQuantity.toString()}
          onChangeText={value => setDirectQuantity(value)} />
        <ControlQuantityButton onPress={() => setQuantity(1)}>
          <ArrowRight fill={theme.colors.primary} />
        </ControlQuantityButton>
      </InputGroup>

      <ConfirmButton onPress={confirmChanges} disabled={productQuantity == 0 && !hadDeletes} text={'Salvar contagem'} />
    </Container>
  );
}

export default memo(Product);