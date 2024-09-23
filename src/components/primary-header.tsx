import {colors, fonts} from '@constants';
import React, {memo} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {DrawerActions, useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface IHeaderProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: JSX.Element;
}

const PrimaryHeader = memo(
  ({title, style, textStyle, children}: IHeaderProps) => {
    const navigation = useNavigation();

    const openDrawer = () => {
      navigation?.dispatch(DrawerActions.openDrawer());
    };

    return (
      <View style={[styles.headerContainer, style]}>
        <TouchableOpacity onPress={openDrawer}>
          <MaterialCommunityIcons
            name={'menu'}
            size={30}
            color={colors.primary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          {title ? (
            <Text style={[styles.title, textStyle]}>{title}</Text>
          ) : (
            <Image
              source={require('@images/ABHA.png')}
              style={{height: 50, width: 50, resizeMode: 'contain'}}
            />
          )}
        </View>
        {children}
      </View>
    );
  },
);

export default PrimaryHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    paddingVertical: 5,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.MONTSERRAT_BOLD,
    // transform: [{rotate: '-90deg'}],
  },
});
