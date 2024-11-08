import {colors} from '@constants';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleProp, StyleSheet} from 'react-native';
import FastImage, {ImageStyle, ResizeMode} from 'react-native-fast-image';

//----------------------
interface IImageProps {
  url?: string;
  imageStyles?: StyleProp<ImageStyle>;
  imgPath?: boolean;
  resizeMode?: ResizeMode;
}

const CustomImage = ({
  imageStyles,
  url,
  imgPath = false,
  resizeMode,
}: IImageProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    return () => {
      setLoading(false);
      setError(false);
    };
  }, []);
  return (
    <FastImage
      style={imageStyles ?? styles.image}
      source={
        imgPath
          ? require('../assets/images/profile.png')
          : error
          ? require('../assets/images/no-image-found.png')
          : {
              uri: url,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }
      }
      onLoadStart={() => {
        setLoading(true);
      }}
      onLoadEnd={() => {
        setLoading(false);
      }}
      onLoad={() => {
        setLoading(false);
      }}
      onError={() => {
        setLoading(false);
        setError(true);
      }}
      resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.cover}
    >
      {loading ? (
        <ActivityIndicator
          color={colors.primary}
          style={styles.loader}
          size="small"
        />
      ) : null}
    </FastImage>
  );
};

export default CustomImage;

//------------------------------------
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
