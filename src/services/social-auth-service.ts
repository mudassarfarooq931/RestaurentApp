// import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {setAuthLoading, setCurrentUser} from '@redux/slice/auth/auth-slice';

import store from '@redux/store';
import {HelperService, LogService} from '@services';
// import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

export default class SocialAuthService {
  private static _instance: SocialAuthService;
  private constructor() {}

  public static getInstance = () => {
    if (!SocialAuthService._instance) {
      SocialAuthService._instance = new SocialAuthService();
    }

    return SocialAuthService._instance;
  };

  //----------------------------------------------------------------
  SocialSignUp = (provider: string) => {
    if (provider === 'google') {
      this.GoogleLogin(provider);
    }
    // if (provider === 'facebook') {
    //   this.FacebookLogin(provider);
    // }
    // if (provider === 'apple') {
    //   this.AppleLogin(provider);
    // } else return;
  };

  //----------------------------------------------------------------
  GoogleLogin = async (provider: string) => {
    const dispatch = store.store.dispatch;
    dispatch(setAuthLoading(true));
    try {
      const hasPlayService = await GoogleSignin.hasPlayServices();

      if (hasPlayService) {
        const googleResponse = await GoogleSignin.signIn();
        const userInfo = googleResponse?.data;
        const area = store.store.getState()?.map.area;
        const city = store.store.getState()?.map.city;
        if (!userInfo) {
          dispatch(setAuthLoading(false));
          return null;
        }

        const payload = {
          id: userInfo?.user?.id ?? '',
          socialAuthToken: userInfo?.idToken ?? '',
          authType: provider,
          userName: userInfo?.user?.name ?? '',
          firstName: userInfo?.user?.givenName ?? '',
          lastName: userInfo?.user?.familyName ?? '',
          fullName: HelperService?.getInstance()?.getUserFullName(
            userInfo?.user?.givenName ?? '',
            userInfo?.user?.familyName ?? '',
          ),
          email: userInfo?.user?.email ?? '',
          imgUrl: userInfo?.user?.photo ?? '',
          mobile: '',
          roleId: '1',
          roleName: 'customer',
          city: city,
          area: area,
          address: '',
        };

        console.log(
          JSON.stringify(payload, null, 2),
          '..GoogleSignIn..payload..UserInfo...',
          JSON.stringify(userInfo, null, 2),
        );
        dispatch(setAuthLoading(false));
        dispatch(setCurrentUser(payload));
        return userInfo;
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        LogService.log('GOOGLE LOGIN ERROR IS: ', 'Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        LogService.log('GOOGLE LOGIN ERROR IS: ', 'Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        LogService.log(
          'GOOGLE LOGIN ERROR IS: ',
          'PLAY_SERVICES_NOT_AVAILABLE',
        );
        // play services not available or outdated
      } else {
        // some other error happened
      }
      LogService.log('GOOGLE LOGIN ERROR IS: ', JSON.stringify(error, null, 2));
      dispatch(setAuthLoading(false));
    }
  };

  //----------------------------------------------------------------
  //   FacebookLogin = async (provider: string) => {
  //     // Attempt login with permissions
  //     const result = await LoginManager.logInWithPermissions([
  //       'public_profile',
  //       'email',
  //     ]);

  //     if (result.isCancelled) {
  //       throw 'User cancelled the login process';
  //     }

  //     // Once signed in, get the users AccessToken
  //     const data = await AccessToken.getCurrentAccessToken();

  //     if (!data) {
  //       throw 'Something went wrong obtaining access token';
  //     }

  //     AccessToken.getCurrentAccessToken().then(data => {
  //       if (data) {
  //         this.initUser(data, provider);
  //       } else {
  //         // Handle the case when there's no access token
  //         LogService.error('No access token available');
  //       }
  //     });
  //   };

  //   initUser = (data: any, provider: string) => {
  //     const dispatch = store.store.dispatch;

  //     fetch(
  //       'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
  //         data?.accessToken,
  //     )
  //       .then(response => response.json())
  //       .then(userInfo => {
  //         const externalAuthVm = {
  //           id: userInfo?.id ?? '',
  //           idToken: '',
  //           provider: provider,
  //           authToken: data?.accessToken,
  //           name: userInfo?.name ?? '',
  //           email: userInfo?.email ?? '',
  //           firstName: '',
  //           lastName: '',
  //           photoUrl: '',
  //         };

  //         const socialSignUpPayload = {
  //           email: userInfo?.email ?? '',
  //           externalAuthVm: externalAuthVm,
  //           provider: provider,
  //         };

  //         dispatch(socialSignUp(socialSignUpPayload));

  //         return userInfo;
  //       })
  //       .catch(error => {
  //         LogService.log(
  //           'ERROR GETTING DATA FROM FACEBOOK IS: ' + JSON.stringify(error),
  //         );
  //       });
  //   };

  //----------------------------------------------------------------
  //   AppleLogin = async (provider: string) => {
  //     const dispatch = store.store.dispatch;

  //     try {
  //       // performs login request
  //       const userInfo = await appleAuth.performRequest({
  //         requestedOperation: appleAuth.Operation.LOGIN,
  //         // Note: it appears putting FULL_NAME first is important, see issue #293
  //         requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  //       });

  //       // get current authentication state for user
  //       // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  //       const credentialState = await appleAuth.getCredentialStateForUser(
  //         userInfo.user,
  //       );

  //       LogService.log(
  //         'APPLE LOGIN SUCCESS: ',
  //         JSON.stringify(userInfo, null, 2),
  //       );

  //       // use credentialState response to ensure the user is authenticated
  //       if (credentialState === appleAuth.State.AUTHORIZED) {
  //         // user is authenticated
  //         const externalAuthVm = {
  //           id: userInfo?.user ?? '',
  //           idToken: '',
  //           provider: provider,
  //           authToken: userInfo?.identityToken ?? '',
  //           name: `${userInfo?.fullName?.givenName ?? ''} ${
  //             userInfo?.fullName?.familyName ?? ''
  //           }`.trim(),
  //           email: userInfo?.email ?? '',
  //           firstName: userInfo?.fullName?.givenName ?? '',
  //           lastName: userInfo?.fullName?.familyName ?? '',
  //           photoUrl: '',
  //         };

  //         const socialSignUpPayload = {
  //           email: userInfo?.email ?? '',
  //           externalAuthVm: externalAuthVm,
  //           provider: provider,
  //         };

  //         dispatch(socialSignUp(socialSignUpPayload));
  //       } else {
  //         dispatch(setLoading(false));
  //       }
  //     } catch (error: any) {
  //       dispatch(setLoading(false));
  //       LogService.log('APPLE LOGIN ERROR IS: ', JSON.stringify(error, null, 2));
  //     }
  //   };

  //----------------------------------------------------------------
  SocialSignOut = async () => {
    const {currentUser} = store.store.getState()?.auth;

    // if (currentUser?.socialProvider === 'facebook') {
    //   this.FacebookSignOut();
    // }
    if (currentUser?.authType === 'google') {
      this.GoogleSignOut();
    }
    // if (currentUser?.socialProvider === 'apple') {
    // }
  };

  //----------------------------------------------------------------
  GoogleSignOut = async () => {
    const dispatch = store.store.dispatch;
    const currentUser = store.store.getState()?.auth?.currentUser;

    try {
      await GoogleSignin.signOut();
      await GoogleSignin.clearCachedAccessToken(currentUser?.socialAuthToken);
      HelperService?.getInstance()?.clearAllStates();
      LogService.log('GOOGLE LOGOUT SUCCESS');
    } catch (error) {
      dispatch(setAuthLoading(false));
      LogService.log('GOOGLE LOGOUT ERROR IS: ', error);
    }
  };

  //----------------------------------------------------------------
  //   FacebookSignOut = async () => {
  //     try {
  //       LoginManager.logOut();
  //       LogService.log('FACEBOOK LOGOUT SUCCESS');
  //     } catch (error) {
  //       LogService.log('FACEBOOK LOGOUT ERROR IS: ', error);
  //     }
  //   };

  //---------------------------------------------------------------
  //   SocialSignupForm = (
  //     userId: string,
  //     provider: string,
  //     companyDetails?: CompanyInformation,
  //     firstName?: string,
  //     lastName?: string,
  //   ) => {
  //     const dispatch = store.store.dispatch;

  //     const companyInformation = {
  //       companyName: companyDetails?.companyName ?? '',
  //       companyEmail: companyDetails?.companyEmail ?? '',
  //       primaryAddress: companyDetails?.primaryAddress ?? '',
  //       primaryAddress2: companyDetails?.primaryAddress2 ?? '',
  //       phoneNo: companyDetails?.phoneNo ?? '',
  //       primaryMobileNo: companyDetails?.primaryMobileNo ?? '',
  //       numberOfUsers: companyDetails?.numberOfUsers ?? 0,
  //     };

  //     const externalAuthVm =
  //       provider == 'apple'
  //         ? {
  //             firstName: firstName ?? '',
  //             lastName: lastName ?? '',
  //           }
  //         : undefined;

  //     const socialSignUpPayload = {
  //       userId: userId,
  //       isStandAlone: companyDetails?.isIndividual ?? true,
  //       isCompany: companyDetails?.isCompany ?? false,
  //       speciality: companyDetails?.speciality ?? '',
  //       companyInformation: companyInformation,
  //       externalAuthVm: externalAuthVm,

  //       provider: provider,
  //     };

  //     dispatch(socialSignUp(socialSignUpPayload));
  //   };
}
