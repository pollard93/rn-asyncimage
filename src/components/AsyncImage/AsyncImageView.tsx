import React, { useState, useEffect } from 'react';
import { Image, Animated, View } from 'react-native';
import { AsyncImage, AsyncImageProps } from './AsyncImage';
import styles from './AsyncImage.styles';


export interface AsyncImageViewProps extends AsyncImageProps {
  opacity: Animated.Value;
  loaded: boolean;
  onLoad: () => void;
}


const AsyncImageView = (props: AsyncImageViewProps) => {
  const [fullUrl] = useState(props.fullUrl);
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
   * If props.blockUpdate is false then accept updates
   */
  useEffect(() => {
    /**
     * If initialised and the fullUrl is not in tempUrls then concat into tempUrls
     * Must wait until initialised, otherwise the first fullUrl will be pushed into tempUrls
     */
    if (initialised && !tempUrls.includes(props.fullUrl)) {
      setTempUrls(tempUrls.concat(props.fullUrl));
    }
  }, [props.fullUrl]);


  useEffect(() => {
    setInitialised(true);
  }, []);


  return (
    <View {...containerProps} >
      <PlaceholderImage />
      <SplashImage />

      {/* Main image */}
      {fullUrl && (
        <Animated.Image
          {...imageProps}
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            { opacity },
            styles.fullImage,
          ]}
          onLoad={onLoad}
          source={{
            uri: fullUrl,
          }}
          testID='AIFULL'
        />
      )}

      {/* Iterate over tempUrls and display them, set blockUpdate so AsyncImage does not accept updates */}
      {tempUrls.map((t) => (
        <AsyncImage
          key={t}
          testID='TempImage'
          splashUrl={null}
          fullUrl={t}
          containerProps={{
            style: styles.tempImage,
          }}
          blockUpdate
          onLoaded={() => {
            /**
             * On loaded remove the first item in the array, removing unecessary views
             */
            if (tempUrls.length > 1) {
              const newTempUrls = [...tempUrls];
              newTempUrls.shift();
              setTempUrls(newTempUrls);
            }
          }}
        />
      ))}
    </View>
  );
};

export default AsyncImageView;
