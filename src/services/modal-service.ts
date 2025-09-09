interface ModalAction {
  text: string;
  onPress: () => void;
  style?: 'default' | 'destructive' | 'cancel';
}

interface ModalConfig {
  title: string;
  message?: string;
  buttons: ModalAction[];
  type?: 'warning' | 'info' | 'success' | 'error';
  icon?: string;
}

class ModalService {
  private static _instance: ModalService;
  private modalConfig: ModalConfig | null = null;
  private isVisible = false;
  private listeners: Array<
    (config: ModalConfig | null, visible: boolean) => void
  > = [];

  private constructor() {}

  public static getInstance = () => {
    if (!this._instance) {
      this._instance = new ModalService();
    }
    return this._instance;
  };

  // Subscribe to modal state changes
  subscribe = (
    listener: (config: ModalConfig | null, visible: boolean) => void,
  ) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  };

  // Show modal
  showModal = (config: ModalConfig) => {
    this.modalConfig = config;
    this.isVisible = true;
    this.notifyListeners();
  };

  // Hide modal
  hideModal = () => {
    this.isVisible = false;
    this.modalConfig = null;
    this.notifyListeners();
  };

  // Get current modal state
  getModalState = () => ({
    config: this.modalConfig,
    visible: this.isVisible,
  });

  // Notify all listeners
  private notifyListeners = () => {
    this.listeners.forEach(listener => {
      listener(this.modalConfig, this.isVisible);
    });
  };

  // Convenience methods for common alert types
  showError = (title: string, message: string, onOk?: () => void) => {
    this.showModal({
      title,
      message,
      type: 'error',
      buttons: [
        {
          text: 'OK',
          onPress: onOk || (() => {}),
          style: 'default',
        },
      ],
    });
  };

  showWarning = (title: string, message: string, onOk?: () => void) => {
    this.showModal({
      title,
      message,
      type: 'warning',
      buttons: [
        {
          text: 'OK',
          onPress: onOk || (() => {}),
          style: 'default',
        },
      ],
    });
  };

  showInfo = (title: string, message: string, onOk?: () => void) => {
    this.showModal({
      title,
      message,
      type: 'info',
      buttons: [
        {
          text: 'OK',
          onPress: onOk || (() => {}),
          style: 'default',
        },
      ],
    });
  };

  showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText = 'OK',
    cancelText = 'Cancel',
  ) => {
    this.showModal({
      title,
      message,
      type: 'warning',
      buttons: [
        {
          text: cancelText,
          onPress: onCancel || (() => {}),
          style: 'cancel',
        },
        {
          text: confirmText,
          onPress: onConfirm,
          style: 'default',
        },
      ],
    });
  };
}

export default ModalService;
