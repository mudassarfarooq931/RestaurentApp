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

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryPress: () => void;
  onSecondaryPress?: () => void;
  type?: 'warning' | 'info' | 'success' | 'error';
  icon?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  message,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryPress,
  onSecondaryPress,
  type = 'warning',
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
        return 'alert-circle-outline';
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
        return colors.orange;
    }
  };

  const getPrimaryButtonStyle = () => {
    switch (type) {
      case 'error':
        return styles.destructiveButton;
      case 'warning':
        return styles.warningButton;
      default:
        return styles.primaryButton;
    }
  };

  const getPrimaryButtonTextStyle = () => {
    switch (type) {
      case 'error':
        return styles.destructiveButtonText;
      case 'warning':
        return styles.warningButtonText;
      default:
        return styles.primaryButtonText;
    }
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
              <Text style={styles.message}>{message}</Text>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                {secondaryButtonText && (
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={onSecondaryPress || onClose}
                    activeOpacity={0.8}>
                    <Text style={styles.secondaryButtonText}>
                      {secondaryButtonText}
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={getPrimaryButtonStyle()}
                  onPress={onPrimaryPress}
                  activeOpacity={0.8}>
                  <Text style={getPrimaryButtonTextStyle()}>
                    {primaryButtonText}
                  </Text>
                </TouchableOpacity>
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
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.white,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: colors.lighterGray,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.gray,
  },
  warningButton: {
    flex: 1,
    backgroundColor: colors.orange,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  warningButtonText: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.white,
  },
  destructiveButton: {
    flex: 1,
    backgroundColor: colors.red,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  destructiveButtonText: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.white,
  },
});

export default CustomModal;
