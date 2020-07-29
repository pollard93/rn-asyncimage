import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  placeholderView: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  fullImage: {
    height: '100%',
    width: '100%',
  },
  tempImage: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
