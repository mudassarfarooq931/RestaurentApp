import {colors, fonts} from '@constants';
import React from 'react';

import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

//---------------------
interface IInputProps {
  props?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
  children?: JSX.Element;
  fromChatScreen?: boolean;
  placeholder?: string;
  multiLine?: boolean;
  value?: string;
  textStyle?: StyleProp<TextStyle>;
  secure?: boolean;
  placeholderTextColor?: string;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

//-------------------------------------
const Input: React.FC<IInputProps> = ({
  style,
  props,
  children,
  multiLine = true,
  value,
  placeholder,
  placeholderTextColor,
  textStyle = {},
  onChangeText = () => {},
  secure = false,
  keyboardType = 'default',
  editable = true,
  onBlur = () => {},
}) => {
  return (
    <>
      <View style={[styles.container, style]}>
        <TextInput
          {...props}
          secureTextEntry={secure}
          style={[
            styles.input,
            {
              textAlignVertical: 'center',
              // paddingVertical: Platform.OS === 'ios' ? 2.5 : 5,
            },
            textStyle,
          ]}
          placeholderTextColor={placeholderTextColor ?? colors.gray}
          selectionColor={colors.gray}
          multiline={multiLine}
          placeholder={placeholder ?? 'Type here ...'}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          editable={editable}
          onBlur={onBlur}
        />
        {children}
      </View>
    </>
  );
};

export default Input;

//--------------------------------
const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 8,
    paddingLeft: 10,
    justifyContent: 'center',

    // paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    backgroundColor: colors.white,
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
  input: {
    fontFamily: fonts.POPPINS_REGULAR,
    color: '#666666',
    flex: 1,
    fontSize: 14,
    textAlignVertical: 'center',
  },
});
