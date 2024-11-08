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
        <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
          <MaterialCommunityIcons
            style={styles.backIconWrapper}
            name={isDrawer ? 'menu' : 'arrow-left'}
            size={30}
            color={colors.primary}
          />
        </TouchableOpacity>

        <View style={styles.headerWrapper}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.headerText, textStyle]}
          >
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
    height: 56,
    elevation: 5,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backIconWrapper: {
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 100,
    width: 50,
  },
  headerWrapper: {
    paddingHorizontal: '3%',
  },
  headerText: {
    fontSize: 20,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    textTransform: 'uppercase',
  },
  iconWrapper: {
    width: 50,
  },
});
