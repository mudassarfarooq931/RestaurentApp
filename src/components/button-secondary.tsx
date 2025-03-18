import {colors} from '@constants';
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
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: Array<JSX.Element> | JSX.Element;
}

//----------------------------------------------------------------------------
const ButtonSecondary: React.FC<IButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  disabled = false,
  children,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress && onPress()}
      disabled={disabled}>
      {children}
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonSecondary;

//------------------------------------
const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ///////////---shadow---///////////
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  title: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
