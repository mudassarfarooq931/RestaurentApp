import {colors, fonts} from '@constants';
import {useField} from 'formik';
import React, {useState} from 'react';
import {KeyboardTypeOptions} from 'react-native';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//-------------------------------------
interface IInputProps extends TextInputProps {
  label?: string;
  name: string; // Formik field name
  isRequired?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

//-------------------------------------
const FormikInput: React.FC<IInputProps> = ({
  label,
  isRequired,
  name,
  containerStyle,
  keyboardType = 'default',
  editable = true,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const [visible, setVisible] = useState<boolean>(!props.secureTextEntry);

  // Add error boundary for Formik context
  if (!field || !meta || !helpers) {
    console.warn('FormikInput must be used within a Formik component');
    return null;
  }

  return (
    <>
      {label && (
        <Text style={styles.requiredInput}>
          {isRequired && '*'}
          <Text style={styles.label}>{label}</Text>
        </Text>
      )}
      <View style={[styles.container, containerStyle]}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          {...props}
          value={field.value}
          onChangeText={helpers.setValue}
          onBlur={() => helpers.setTouched(true)}
          style={[styles.input, props.style, leftIcon && styles.inputWithLeftIcon]}
          secureTextEntry={!visible}
          placeholderTextColor={colors.lightGray}
          keyboardType={keyboardType}
          editable={editable}
          cursorColor={colors.black}
        />
        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
        {props?.secureTextEntry && !rightIcon && (
          <Pressable onPress={() => setVisible(!visible)}>
            <Ionicons
              name={visible ? 'eye-outline' : 'eye-off-outline'}
              color={colors.primary}
              style={styles.icon}
              size={25}
            />
          </Pressable>
        )}
      </View>
      {meta.touched && meta.error ? (
        <Text style={styles.errorText}>{meta.error}</Text>
      ) : null}
    </>
  );
};

export default FormikInput;

//--------------------------------
const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lighterGray,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.black,
    marginBottom: 8,
  },
  requiredInput: {
    color: colors.black,
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.black,
    flex: 1,
    fontSize: 16,
  },
  inputWithLeftIcon: {
    marginLeft: 10,
  },
  leftIconContainer: {
    marginRight: 5,
  },
  rightIconContainer: {
    marginLeft: 10,
  },
  errorText: {
    color: colors.red,
    fontSize: 12,
    marginTop: 5,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
  icon: {marginLeft: 5},
});
