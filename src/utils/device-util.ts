import Logger from '@services/log-service';
import ModalService from '@services/modal-service';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  check,
  checkMultiple,
  Permission,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
export class DeviceUtil {
  private static _instance: DeviceUtil;
  private constructor() {}
  public static getInstance = () => {
    if (!this._instance) {
      this._instance = new DeviceUtil();
    }
    return this._instance;
  };

  getDeviceInfo = async () => {
    try {
      const deviceID = await DeviceInfo?.getUniqueId();
      const deviceName = await DeviceInfo?.getDeviceName();
      return {
        device_id: deviceID,
        device_name: deviceName,
        device_platform: Platform.OS,
      };
    } catch (error) {
      return false;
    }
  };

  getDeviceSystemVersion = () => {
    const systemVersion = DeviceInfo.getSystemVersion();
    return systemVersion;
  };

  checkAllPermissions = (callback?: Function) => {
    const apiLevel = this.getDeviceSystemVersion();
    if (apiLevel && parseInt(apiLevel) >= 13) {
      const androidPermissions = [
        // PERMISSIONS.ANDROID.CAMERA,
        // PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      ];
      checkMultiple(androidPermissions)?.then(statuses => {
        // const [CAMERA, MEDIA, NOTIFICATIONS] = androidPermissions;
        const [NOTIFICATIONS] = androidPermissions;
        if (
          // statuses[CAMERA] === RESULTS.UNAVAILABLE ||
          // statuses[MEDIA] === RESULTS.UNAVAILABLE ||
          statuses[NOTIFICATIONS] === RESULTS.UNAVAILABLE
        ) {
          ModalService.getInstance().showError(
            'Error',
            'Hardware is not available',
          );
        } else if (
          // statuses[CAMERA] === RESULTS.BLOCKED ||
          // statuses[MEDIA] === RESULTS.BLOCKED ||
          statuses[NOTIFICATIONS] === RESULTS.BLOCKED
        ) {
          ModalService.getInstance().showError(
            'Error',
            'Permission to access hardware was blocked, please grant manually',
          );
        } else {
          if (
            // statuses[CAMERA] === RESULTS.DENIED &&
            statuses[NOTIFICATIONS] !== RESULTS.GRANTED
            // statuses[MEDIA] === RESULTS.DENIED
          ) {
            requestMultiple(androidPermissions)?.then(newStatuses => {
              if (
                // newStatuses[CAMERA] === RESULTS.GRANTED &&
                newStatuses[NOTIFICATIONS] === RESULTS.GRANTED
                // newStatuses[MEDIA] === RESULTS.GRANTED
              ) {
                callback && callback();
              } else {
                ModalService.getInstance().showError(
                  'Error',
                  'One of the permissions was not granted',
                );
              }
            });
          } else if (
            // statuses[CAMERA] === RESULTS.DENIED ||
            statuses[NOTIFICATIONS] !== RESULTS.GRANTED
            // statuses[MEDIA] === RESULTS.DENIED
          ) {
            request(
              // statuses[CAMERA] === RESULTS.DENIED
              //   ? CAMERA
              //   : statuses[NOTIFICATIONS] === RESULTS.DENIED
              // ? NOTIFICATIONS
              // : MEDIA,
              NOTIFICATIONS,
            )?.then(result => {
              if (result === RESULTS.GRANTED) {
                callback && callback();
              } else {
                Logger.log('Error', 'Permission not granted');
              }
            });
          } else if (
            // statuses[CAMERA] === RESULTS.GRANTED ||
            statuses[NOTIFICATIONS] === RESULTS.GRANTED
            // ||
            // statuses[MEDIA] === RESULTS.GRANTED
          ) {
            callback && callback();
          }
        }
      });
    } else {
      const androidPermissions = [PERMISSIONS.ANDROID.CAMERA];

      checkMultiple(androidPermissions)?.then(statuses => {
        const [CAMERA] = androidPermissions;
        if (statuses[CAMERA] === RESULTS.UNAVAILABLE) {
          ModalService.getInstance().showError(
            'Error',
            'Hardware is not available',
          );
        } else if (statuses[CAMERA] === RESULTS.BLOCKED) {
          ModalService.getInstance().showError(
            'Error',
            'Permission to access hardware was blocked, please grant manually',
          );
        } else {
          // if (statuses[CAMERA] === RESULTS.DENIED) {
          //   requestMultiple(androidPermissions)?.then(newStatuses => {
          //     if (newStatuses[CAMERA] === RESULTS.GRANTED) {
          //       callback && callback();
          //     } else {
          //       Alert?.alert('Error', 'One of the permissions was not granted');
          //     }
          //   });
          // } else if (statuses[CAMERA] === RESULTS.DENIED) {
          //   if (statuses[CAMERA] === RESULTS.DENIED) {
          //     // Request the camera permission
          //     request(CAMERA)
          //       .then(result => {
          //         // Check if the result of the permission request is granted
          //         if (result === RESULTS.GRANTED) {
          //           // If a callback is provided, call it
          //           if (callback) {
          //             callback();
          //           }
          //         } else {
          //           // Log an error if the permission is not granted
          //           Logger.log('Error', 'Permission not granted');
          //         }
          //       })
          //       .catch((error: string) => {
          //         // Handle any errors that occurred during the permission request
          //         Logger.log('Error', `Permission request failed: ${error}`);
          //       });
          //   }
          // } else if (statuses[CAMERA] === RESULTS.GRANTED) {
          //   callback && callback();
          // }
        }
      });
    }
  };

  checkPermission = (permission: Permission, callback?: Function) => {
    check(permission)?.then(result => {
      if (result === RESULTS.UNAVAILABLE) {
        // Don't show an error message for unavailable permissions
        // Simply return from the function or handle it differently
        return;
      } else if (result === RESULTS.BLOCKED) {
        ModalService.getInstance().showError(
          'Error',
          'Permission to access hardware was blocked, please grant manually',
        );
      } else {
        if (result === RESULTS.DENIED) {
          request(permission)?.then(_result => {
            if (_result === RESULTS.GRANTED) {
              callback && callback();
            } else {
              ModalService.getInstance().showError(
                'Error',
                'One of the permissions was not granted',
              );
            }
          });
        } else if (result === RESULTS.GRANTED) {
          callback && callback();
        }
      }
    });
  };
}
