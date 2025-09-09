import {ActionModal} from '@components';
import {ModalService} from '@services';
import React, {useEffect, useState} from 'react';

interface ModalState {
  config: any;
  visible: boolean;
}

const GlobalModal: React.FC = () => {
  const [modalState, setModalState] = useState<ModalState>({
    config: null,
    visible: false,
  });

  useEffect(() => {
    const unsubscribe = ModalService.getInstance().subscribe(
      (config, visible) => {
        setModalState({config, visible});
      },
    );

    return unsubscribe;
  }, []);

  if (!modalState.config) {
    return null;
  }

  return (
    <ActionModal
      visible={modalState.visible}
      onClose={() => ModalService.getInstance().hideModal()}
      title={modalState.config.title}
      message={modalState.config.message}
      type={modalState.config.type || 'info'}
      icon={modalState.config.icon}
      buttons={modalState.config.buttons}
    />
  );
};

export default GlobalModal;
