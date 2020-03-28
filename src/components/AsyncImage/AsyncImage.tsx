import React, { useState, memo } from 'react';
import { ImageProps, Animated, ViewProps, ImageSourcePropType } from 'react-native';
import AsyncImageView from './AsyncImageView';


export interface AsyncImageProps {
  fullUrl?: string;
  splashUrl?: string;
  containerProps: ViewProps;
  placeholderImageSource?: ImageSourcePropType;
  splashImageProps?: ImageProps;
  imageProps?: ImageProps;
  blockUpdate?: true; // Image does not accept updates to the fullUrl
  onLoaded?: () => void;
  transitionTime?: number; // Default 300ms
  key?: number | string; // For iteration
  testID?: string; // For testing
}


const AsyncImage = (props: AsyncImageProps) => {
  const [opacity] = useState(new Animated.Value(0));
  const [loaded, setLoaded] = useState(false);


  /**
   * On load animate the opacity and then set loaded
   */
  const onLoad = () => {
    if (loaded) return;

    Animated.timing(opacity, {
      toValue: 1,
      duration: props.transitionTime || 300,
      useNativeDriver: true,
    }).start(() => {
      setLoaded(true);

      if (props.onLoaded) {
        props.onLoaded();
      }
    });
  };


  return (
    <AsyncImageView
      {...props}
      opacity={opacity}
      loaded={loaded}
      onLoad={onLoad}
    />
  );
};

export default memo(AsyncImage, (props) => props.blockUpdate);
