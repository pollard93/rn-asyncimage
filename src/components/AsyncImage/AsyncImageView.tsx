import React, { useState } from 'react';
import { Image, Animated, View } from 'react-native';
import { AsyncImageProps } from './AsyncImage';
import styles from './AsyncImage.styles';


export interface AsyncImageViewProps extends AsyncImageProps {
  loaded: boolean;
  onLoad: () => void;
}


const AsyncImageView = (props: AsyncImageViewProps) => {
  const [opacity] = useState(new Animated.Value(0));
  const {
    loaded,
    onLoad,
    fullUrl,
    splashUrl,
    containerProps,
    placeholderImageSource,
    splashImageProps = {},
    imageProps = {},
  } = props;


  /**
   * Image to be shown at the base at all times
   * Useful if the urls fail
   */
  const PlaceholderImage = () => {
    if (loaded || !placeholderImageSource) return null;

    return (
      <View style={styles.placeholderView}>
        <Image
          style={styles.placeholderImage}
          source={placeholderImageSource}
          testID='AIPLACEHOLDER'
        />
      </View>
    );
  };


  /**
   * Image to be shown while the main image is loaded
   */
  const SplashImage = () => {
    if (loaded) return null;

    return (
      <Image
        {...splashImageProps}
        style={styles.splashImage}
        source={{
          uri: splashUrl,
        }}
        testID='AISPLASH'
      />
    );
  };


  return (
    <View {...containerProps} >
      <PlaceholderImage />
      <SplashImage />
      <Animated.Image
        {...imageProps}
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          { opacity: !loaded ? opacity : 1 },
          styles.fullImage,
        ]}
        onLoad={onLoad}
        source={{
          uri: fullUrl,
        }}
        testID='AIFULL'
      />
    </View>
  );
};

export default AsyncImageView;
