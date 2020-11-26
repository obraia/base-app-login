import styled from 'styled-components/native';
import { lighten } from 'polished';
import { BarCodeScanner as Scanner } from 'expo-barcode-scanner';

export const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background-color: ${props => lighten(0.05, props.theme.colors.background)};
  /* border: 1px solid  ${props => props.theme.colors.primary}; */
  border-radius: 10px;
  overflow: hidden;
`;

export const BarCodeScanner = styled(Scanner)`
  width: 100%;
  height: 250%;
`;
