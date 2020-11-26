import styled from 'styled-components/native';
import { lighten } from 'polished';

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.colors.background};
`;

export const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: 10px;
`;

export const Textarea = styled.TextInput`
  flex: 1;
  justify-content: flex-start;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 18px;
  background-color: ${props => lighten(0.1, props.theme.colors.background)};
  color: ${props => props.theme.colors.textBackground};
`;

export const CountListContainer = styled.ScrollView`
  flex: 1;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => lighten(0.1, props.theme.colors.background)};
`; 

export const CountItemButton = styled.TouchableOpacity`

`;

export const CountItemText = styled.Text`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  border-radius: 10px;
  background-color: ${props => lighten(0.05, props.theme.colors.background)};
  color: ${props => props.theme.colors.textBackground};
`;

export const CountWhiteSpace = styled.View`
  height: 10px;
`;

export const InputQuantity = styled.TextInput`
  flex: 1;
  border-radius: 10px;
  margin: 0 10px;
  padding: 10px;
  font-size: 36px;
  text-align: center;
  background-color: ${props => lighten(0.1, props.theme.colors.background)};
  color: ${props => props.theme.colors.textBackground};
`;

export const ControlQuantityButton = styled.TouchableOpacity`
  width: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${props => lighten(0.1, props.theme.colors.background)};
`;