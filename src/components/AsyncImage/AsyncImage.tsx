import React, { useState } from 'react';
import { ImageProps, Animated, ViewProps, ImageSourcePropType } from 'react-native';
import AsyncImageView from './AsyncImageView';


export interface AsyncImageProps {
  fullUrl: string;
  splashUrl: string;
  containerProps: ViewProps;
  placeholderImageSource?: ImageSourcePropType;
  splashImageProps?: ImageProps;
  imageProps?: ImageProps;
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
      duration: 300,
      useNativeDriver: true,
    }).start(() => setLoaded(true));
  };


  return (
    <AsyncImageView
      {...props}
      loaded={loaded}
      onLoad={onLoad}
    />
  );
};

export default AsyncImage;
