import React, { useState, useEffect } from 'react';

import { Container, BarCodeScanner } from './styles';

const Scanner = (props: { stateBarcode: { barcode: string, setBarcode: (barcode: string) => void } }) => {

  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarcodeScanned = ({ type, data }: any) => {
    if (data !== props.stateBarcode.barcode) {
      props.stateBarcode.setBarcode(data);
    }
  }

  return (
    <Container>
      <BarCodeScanner onBarCodeScanned={handleBarcodeScanned} />
    </Container>
  );
}

export default Scanner;