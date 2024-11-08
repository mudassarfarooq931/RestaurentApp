import {colors, fonts} from '@constants';
import {HelperService} from '@services';
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
  checkNetwork?: boolean;
}

//----------------------------------------------------------------------------
const ButtonPrimary: React.FC<IButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  disabled,
  checkNetwork,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={disabled}
      style={[
        styles.container,
        disabled && {backgroundColor: colors.moderateBlue_middle},
        style,
      ]}
      onPress={() => {
        if (checkNetwork) {
          const isNetwork = HelperService?.getInstance()?.isNetAvailable();
          if (isNetwork) {
            onPress && onPress();
          }
        } else {
          onPress && onPress();
        }
      }}
    >
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

//------------------------------------
const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,

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
