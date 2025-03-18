import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearAllAuthStates} from '@redux/slice/auth/auth-slice';
import {clearAllMapState} from '@redux/slice/common/map-slice';
import {setIsConnected} from '@redux/slice/common/net-info-slice';
import {setToastMessage} from '@redux/slice/common/toast-message-slice';
import {DropDownType} from '@redux/states';
import store from '@redux/store';
import {showMessage} from 'react-native-flash-message';
import * as Yup from 'yup';

export class HelperService {
  private static _instance: HelperService;
  private constructor() {}

  public static getInstance = () => {
    if (!HelperService._instance) {
      HelperService._instance = new HelperService();
    }
    return HelperService._instance;
  };

  getParsedData = (data: string) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  };

  handleLogout = async () => {
    const dispatch = store.store.dispatch;
    const {currentUser} = store.store.getState().auth;
    if (currentUser) {
      //   dispatch(
      //     logoutUser({
      //       userId: currentUser?.id ?? '',
      //       token: currentUser?.fireBaseToken ?? '',
      //     }),
      //   );
    } else {
      const temp = await AsyncStorage.getItem('persist:root');
      const authPersist = temp ? this.getParsedData(temp)?.auth : null;
      const _currentUser = this.getParsedData(authPersist)?.currentUser
        ? this.getParsedData(this.getParsedData(authPersist)?.currentUser)
        : null;
      //   dispatch(
      //     logoutUser({
      //       userId: _currentUser?.id ?? '',
      //       token: _currentUser?.fireBaseToken ?? '',
      //     }),
      //   );
    }
  };

  clearAllStates = async () => {
    const dispatch = store.store.dispatch;
    dispatch(clearAllAuthStates());
    dispatch(clearAllMapState());
    dispatch(setToastMessage('Logout Success'));
  };

  getLabel = (val?: string, list?: Array<DropDownType>) => {
    if (val && list && list.length > 0) {
      let label = list.find(v => v.value == val)?.label;
      return label;
    }
    return val ? val : null;
  };

  isNetAvailable = () => {
    const netInfo = store?.store?.getState()?.netInfo?.isConnected;
    const dispatch = store.store.dispatch;
    if (!netInfo) {
      dispatch(setToastMessage('Internet unavailable!'));
      return false;
    } else {
      return true;
    }
  };

  isSchemaValid = async (
    schema: Yup.ObjectSchema<{}, Yup.AnyObject, {}, ''>,
    formData: Object,
  ): Promise<{
    error: boolean;
    data: any;
    msg: string | null;
  }> => {
    return schema
      .validate(formData, {abortEarly: false})
      .then(data => {
        return {error: false, data: data, msg: null};
      })
      .catch(err => {
        return {error: true, data: null, msg: err?.errors[0]};
      });
  };

  showTimedToast = (time: number, message?: string) => {
    const dispatch = store.store.dispatch;
    setTimeout(() => {
      dispatch(setToastMessage(message));
    }, time);
  };

  showNetworkStatus = (isConnected: boolean) => {
    const prevStatus = store.store.getState()?.netInfo.isConnected;
    const dispatch = store.store.dispatch;

    if (prevStatus != isConnected) {
      dispatch(setIsConnected(isConnected));
      if (!isConnected) {
        showMessage({
          type: 'danger',
          icon: 'warning',
          message: 'Internet unavailable!',
          autoHide: false,
          hideOnPress: true,
        });
      } else {
        showMessage({
          type: 'success',
          icon: 'success',
          message: 'Back Online!',
          duration: 2000,
          hideOnPress: true,
        });
      }
    }
  };

  getUserFullName = (firstName: string, lastName: string) => {
    const fullName =
      firstName && lastName
        ? firstName + ' ' + lastName
        : firstName
        ? firstName
        : lastName;

    return fullName;
  };
}
