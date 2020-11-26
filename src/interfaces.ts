import { DefaultTheme } from "styled-components";

export interface IButtonProps {
  command: string;
  type: string;
  icon: any;
}

export interface IThemeState {
  theme: DefaultTheme;
}

export interface ICalcState {
  result: string;
  expression: string;
}

export interface IMenuState {
  isOpen: Boolean;
}

export interface IProductState {
  products: IProduct[]
}

export interface IUser {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface IProduct {
  barcodeA: string;
  barcodeB: string;
  description: string;
  counts: IQuantity[];
  expectedCount: number;
}

export interface IQuantity {
  quantity: number;
  date: string;
  timestamp: number;
}

export interface INavigationState {
  page: string;
}

export interface IAuthState {
  isAuthenticated: boolean;
  token: string;
}

export interface IReducers {
  themeReducers: IThemeState;
  menuReducers: IMenuState;
  productsReducers: IProductState;
  navigationReducers: INavigationState;
  authReducers: IAuthState;
}