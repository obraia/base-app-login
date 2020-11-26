import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useHistory } from "react-router-native";

import { IReducers } from '../../interfaces';
import { Creators as navigationActions } from '../../store/ducks/navigation';

import ListIcon from '../svg/list';
import ImportIcon from '../svg/import';
import ExportIcon from '../svg/export';
import SearchIcon from '../svg/search';

import { Container, ButtonContainer, Button } from './styles';

const Navbar = () => {
  // console.log('[Navbar] render');

  const { theme } = useSelector((state: IReducers) => state.themeReducers);
  const { page } = useSelector((state: IReducers) => state.navigationReducers);
  const dispatch = useDispatch();

  const history = useHistory();

  const goTo = (endpoint: string, pageName: string) => {
    dispatch(navigationActions.goTo(pageName));
    history.push(endpoint)
  }

  return (
    <Container style={{
      shadowColor: "#000", shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6
    }}>
      <ButtonContainer onPress={() => goTo('/home', 'Estoque')}>
        <Button
          style={{ backgroundColor: page === 'Estoque' ? theme.colors.primary : null }}>
          <ListIcon fill={page === 'Estoque' ? theme.colors.textPrimary : theme.colors.primary} />
        </Button>
      </ButtonContainer>

      <ButtonContainer onPress={() => goTo('/import', 'Importar arquivo')}>
        <Button
          style={{ backgroundColor: page === 'Importar arquivo' ? theme.colors.primary : null }}>
          <ImportIcon fill={page === 'Importar arquivo' ? theme.colors.textPrimary : theme.colors.primary} />
        </Button>
      </ButtonContainer>

      <ButtonContainer onPress={() => goTo('/export', 'Exportar arquivo')}>
        <Button
          style={{ backgroundColor: page === 'Exportar arquivo' ? theme.colors.primary : null }}>
          <ExportIcon fill={page === 'Exportar arquivo' ? theme.colors.textPrimary : theme.colors.primary} />
        </Button>
      </ButtonContainer>

      <ButtonContainer onPress={() => goTo('/search', 'Buscar produto')}>
        <Button
          style={{ backgroundColor: page === 'Buscar produto' ? theme.colors.primary : null }}>
          <SearchIcon fill={page === 'Buscar produto' ? theme.colors.textPrimary : theme.colors.primary} />
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default Navbar;