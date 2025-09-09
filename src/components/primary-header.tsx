import {colors, fonts} from '@constants';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {goBack} from '../../root-navigation';

// ----------------------------------------------------------------

type IProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: JSX.Element;
  isDrawer?: boolean;
};

// ----------------------------------------------------------------

const CustomHeader = memo(
  ({title, style, textStyle, children, isDrawer}: IProps) => {
    const navigation = useNavigation();

    const handlePress = () => {
      if (isDrawer) {
        navigation?.dispatch(DrawerActions.openDrawer());
      } else {
        goBack();
      }
    };

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePress}
          style={styles.backIconWrapper}>
          <MaterialCommunityIcons
            name={isDrawer ? 'menu' : 'arrow-left'}
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>

        <View style={styles.headerWrapper}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.headerText, textStyle]}>
            {title}
          </Text>
        </View>

        {children ? children : <View style={styles.iconWrapper} />}
      </View>
    );
  },
);

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: 64,
    elevation: 3,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backIconWrapper: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 24,
    width: 48,
    height: 48,
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  headerWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    textTransform: 'capitalize',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
