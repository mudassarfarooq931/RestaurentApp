import {colors} from '@constants';
import React from 'react';
import {Modal, ModalProps, StyleSheet, Text, View} from 'react-native';
import BackgroundBlurView from './blur-view';
import Progress from './progress';

//------------------------------
interface IProgressDialogProps {
  visible: boolean;
  text?: string;
  props?: ModalProps;
}

//------------------------------------------------------------------------------
const ProgressDialog: React.FC<IProgressDialogProps> = ({
  visible,
  text,
  props,
}) => (
  <Modal visible={visible} transparent={true} animationType={'fade'} {...props}>
    <BackgroundBlurView />
    <View style={styles.container}>
      <View style={styles.loadingWrapper}>
        <Progress style={{marginTop: 24}} />
        <Text
          style={{
            fontSize: 16,
            color: colors.black,
          }}>
          {text ? text : 'Loading...'}
        </Text>
      </View>
    </View>
  </Modal>
);

export default ProgressDialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000077',
  },
  loadingWrapper: {
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
