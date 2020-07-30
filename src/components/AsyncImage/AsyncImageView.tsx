import React, { useState, useEffect, FC } from 'react';
import { Image, Animated, View } from 'react-native';
import { AsyncImage, AsyncImageProps } from './AsyncImage';
import styles from './AsyncImage.styles';


export interface AsyncImageViewProps extends AsyncImageProps {
  opacity: Animated.Value;
  loaded: boolean;
  onLoad: () => void;
}


const AsyncImageView: FC<AsyncImageViewProps> = (props) => {
  const [initialUrl] = useState(props.fullUrl);
  const [tempUrls, setTempUrls] = useState<string[]>([]);
  const [initialised, setInitialised] = useState(false);
  const {
    opacity,
    loaded,
    onLoad,
    splashUrl,
    containerProps,
    placeholderImageProps,
    splashImageProps = {},
    imageProps = {},
  } = props;


  /**
   * Image to be shown at the base at all times
   * Useful if the urls fail
   */
  const PlaceholderImage = () => {
    if (loaded || !placeholderImageProps) return null;

    return (
      <View style={styles.placeholderView}>
        <Image
          {...placeholderImageProps}
          testID='AIPLACEHOLDER'
        />
      </View>
    );
  };


  /**
   * Image to be shown while the main image is loaded
   */
  const SplashImage = () => {
    if (loaded || !splashUrl) return null;

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


  /**
   * Listen for changes on props.fullUrl
   * Append new urls in tempUrls to be rendered on top of original image
   * If props.editable is true then accept updates
   */
  useEffect(() => {
    if (!props.editable || !initialised) return;

    /**
     * If full url has changed to null
     * Or changes back to the initial url
     * Then clear tempUrls
     */
    if (!props.fullUrl || props.fullUrl === initialUrl) {
      setTempUrls([]);
      return;
    }

    /**
     * If the new fullUrl is not the initial url then push into temps
     */
    if (props.fullUrl !== initialUrl) {
      setTempUrls(tempUrls.concat(props.fullUrl));
    }
  }, [props.fullUrl]);


  /**
   * On mount set initialised
   */
  useEffect(() => {
    setInitialised(true);
  }, []);


  return (
    <View {...containerProps} >
      <PlaceholderImage />
      <SplashImage />

      {/* Main image, can remove safely if there's 2 tempUrls displaying below */}
      {initialUrl && tempUrls.length < 2 && (
        <Animated.Image
          {...imageProps}
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            { opacity },
            styles.fullImage,
          ]}
          onLoad={onLoad}
          source={{
            uri: initialUrl,
          }}
          testID='AIFULL'
        />
      )}

      {/* Iterate over tempUrls and display them, set blockUpdate so AsyncImage does not accept updates */}
      {tempUrls.map((t, i) => (
        <AsyncImage
          key={`${t}-${i}`}
          testID='TempImage'
          splashUrl={null}
          fullUrl={t}
          containerProps={{
            style: styles.tempImage,
          }}
        />
      ))}
    </View>
  );
};

export default AsyncImageView;
