import React, { useState, useEffect } from 'react';
import { useAssetPicker } from 'mbp-components-rn-assetpicker';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { AsyncImage, AsyncImageProps } from '../AsyncImage/AsyncImage';

export interface EditableAsyncImageProps {
  setRef: any;
  asyncImageProps: AsyncImageProps;
  onChange: (asset: PhotoIdentifier['node']) => Promise<any>;
  children?: (args: {
    selectedAsset: PhotoIdentifier['node'];
    openPicker: () => void;
    onCancel: () => void;
  }) => JSX.Element;
}

export const EditableAsyncImage = (props: EditableAsyncImageProps) => {
  const assetPicker = useAssetPicker();
  const [selectedAsset, setSelectedAsset] = useState<PhotoIdentifier['node']>();
  const [fullUrl, setFullUrl] = useState(props.asyncImageProps.fullUrl);


  /**
   * When the image is updated outside of the component, possibly by a request
   * If the fullUrl has changed, clear selectedAsset and setFullUrl
   */
  useEffect(() => {
    if (fullUrl !== props.asyncImageProps.fullUrl) {
      setFullUrl(props.asyncImageProps.fullUrl);
      setSelectedAsset(null);
    }
  }, [props.asyncImageProps.fullUrl]);


  /**
   * Open the picker and set type and onSelectAsset callback
   */
  const openPicker = () => {
    assetPicker.updateProps({
      assetType: 'All',
      open: true,
      isMulti: false,
      onSelectAssets: (assets) => {
        /**
         * On select asset
         * Set asset in selectedAsset
         * Execute props.onChange with asset
         */
        setSelectedAsset(assets[0]);
        props.onChange(assets[0]);

        /**
         * Close picker
         */
        assetPicker.updateProps({
          open: false,
        });
      },
    });
  };


  /**
   * On cancel - null selectedAsset and execute onChange
   */
  const onCancel = () => {
    setSelectedAsset(null);
    props.onChange(null);
  };


  return (
    <>
      <AsyncImage
        {...props.asyncImageProps}
        fullUrl={(selectedAsset && selectedAsset.image.uri) || fullUrl}
      />

      {props.children({
        selectedAsset,
        openPicker,
        onCancel,
      })}
    </>
  );
};
