import React from 'react';
import AssetPickerProvider from './AssetPickerProvider/AssetPickerProvider';

const AssetPickerDecorator = (props) => (
  <AssetPickerProvider>
    {props.children}
  </AssetPickerProvider>
);

export default AssetPickerDecorator;
