import {colors, fonts} from '@constants';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

interface ActionButton {
  text: string;
  onPress: () => void;
  style?: 'default' | 'destructive' | 'cancel';
}

interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  buttons: ActionButton[];
  type?: 'warning' | 'info' | 'success' | 'error';
  icon?: string;
}

const ActionModal: React.FC<ActionModalProps> = ({
  visible,
  onClose,
  title,
  message,
  buttons,
  type = 'info',
  icon,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible, scaleAnim]);

  const getIconName = () => {
    if (icon) return icon;
    switch (type) {
      case 'warning':
        return 'alert-circle-outline';
      case 'error':
        return 'close-circle-outline';
      case 'success':
        return 'check-circle-outline';
      case 'info':
        return 'information-outline';
      default:
        return 'information-outline';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'warning':
        return colors.orange;
      case 'error':
        return colors.red;
      case 'success':
        return colors.green;
      case 'info':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  const getButtonStyle = (buttonStyle: string) => {
    switch (buttonStyle) {
      case 'destructive':
        return styles.destructiveButton;
      case 'cancel':
        return styles.cancelButton;
      default:
        return styles.defaultButton;
    }
  };

  const getButtonTextStyle = (buttonStyle: string) => {
    switch (buttonStyle) {
      case 'destructive':
        return styles.destructiveButtonText;
      case 'cancel':
        return styles.cancelButtonText;
      default:
        return styles.defaultButtonText;
    }
  };

  const handleButtonPress = (button: ActionButton) => {
    button.onPress();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [{scale: scaleAnim}],
                },
              ]}>
              {/* Icon */}
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={getIconName()}
                  size={48}
                  color={getIconColor()}
                />
              </View>

              {/* Title */}
              <Text style={styles.title}>{title}</Text>

              {/* Message */}
              {message && <Text style={styles.message}>{message}</Text>}

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                {buttons.map((button, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      getButtonStyle(button.style || 'default'),
                      buttons.length === 1 && styles.singleButton,
                    ]}
                    onPress={() => handleButtonPress(button)}
                    activeOpacity={0.8}>
                    <Text style={getButtonTextStyle(button.style || 'default')}>
                      {button.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    width: width * 0.85,
    maxWidth: 400,
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  singleButton: {
    width: '100%',
  },
  defaultButton: {
    backgroundColor: colors.primary,
  },
  defaultButtonText: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.white,
  },
  cancelButton: {
    backgroundColor: colors.lighterGray,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.gray,
  },
  destructiveButton: {
    backgroundColor: colors.red,
  },
  destructiveButtonText: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.white,
  },
});

export default ActionModal;
