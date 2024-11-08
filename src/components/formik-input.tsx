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
}

//-------------------------------------
const FormikInput: React.FC<IInputProps> = ({
  label,
  isRequired,
  name,
  containerStyle,
  keyboardType = 'default',
  editable = true,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const [visible, setVisible] = useState<boolean>(!props.secureTextEntry);

  return (
    <>
      {label && (
        <Text style={styles.requiredInput}>
          {isRequired && '*'}
          <Text style={styles.label}>{label}</Text>
        </Text>
      )}
      <View style={[styles.container, containerStyle]}>
        <TextInput
          {...props}
          value={field.value}
          onChangeText={helpers.setValue}
          onBlur={() => helpers.setTouched(true)}
          style={[styles.input, props.style]}
          secureTextEntry={!visible}
          placeholderTextColor={colors.lightGray}
          keyboardType={keyboardType}
          editable={editable}
          cursorColor={colors.black}
        />
        {props?.secureTextEntry && (
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
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.POPPINS_MEDIUM,
    color: colors.black,
    marginTop: 10,
  },
  requiredInput: {
    color: colors.black,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 3,
  },
  input: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.black,
    flex: 1,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  icon: {marginLeft: 5},
});
