import {colors, fonts} from '@constants';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

//----------------------
interface IButtonProps {
  onPress?: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  children?: JSX.Element;
}

//----------------------------------------------------------------------------
const ButtonPrimary: React.FC<IButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  disabled,
  children,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={disabled}
      style={[styles.container, style]}
      onPress={() => onPress && onPress()}>
      {children}
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

//------------------------------------
const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: colors.primary,
    flexDirection: 'row',

    ///////////---shadow---///////////
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  title: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 14,
  },
});
