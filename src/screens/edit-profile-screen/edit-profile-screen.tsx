import {
  ActionModal,
  ButtonPrimary,
  FormikInput,
  PrimaryHeader,
} from '@components';
import ProgressDialog from '@components/progress-dialog';
import {appEnums, colors} from '@constants';
import {setToastMessage} from '@redux/slice/common/toast-message-slice';
import {RootState} from '@redux/store';
import {HelperService} from '@services';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {goBack} from '../../../root-navigation';
import {EditProfileSchema} from '../../constants/yup-schema';
import {EditProfileFormValues} from '../../types/custom-types';
import {styles} from './styles';

const EditProfileScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const helperService = HelperService.getInstance();

  // TODO: Get current user data from Redux
  const currentUser = useSelector((state: RootState) => state.auth?.user);

  // TODO: Replace with actual user data from Redux
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Food lover and restaurant enthusiast',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  };

  const initialValues: EditProfileFormValues = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
  };

  const handleSaveProfile = async (values: EditProfileFormValues) => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would typically make an API call to update the user profile
      console.log('Updating profile with:', values);

      // Show success message
      setToastMessage('Profile updated successfully!');

      // Navigate back to profile screen
      goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      setToastMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImagePicker = () => {
    setShowImagePicker(true);
  };

  return (
    <View style={styles.container}>
      <PrimaryHeader title={appEnums.ScreenTitle.EDIT_PROFILE} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Profile Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Image source={{uri: user.avatar}} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.editImageButton}
              onPress={handleImagePicker}
              activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="camera"
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.imageHelperText}>
            Tap the camera icon to change your profile picture
          </Text>
        </View>

        {/* Form Section */}
        <Formik
          initialValues={initialValues}
          validationSchema={EditProfileSchema}
          onSubmit={handleSaveProfile}>
          {({handleSubmit, isValid, dirty}) => (
            <View style={styles.formContainer}>
              <FormikInput
                name="name"
                label={appEnums.FormLabel.FULL_NAME}
                placeholder={appEnums.FormPlaceholder.ENTER_FULL_NAME}
                isRequired
                containerStyle={styles.inputContainer}
              />

              <FormikInput
                name="email"
                label={appEnums.FormLabel.EMAIL_ADDRESS}
                placeholder={appEnums.FormPlaceholder.ENTER_EMAIL}
                keyboardType="email-address"
                isRequired
                containerStyle={styles.inputContainer}
              />

              <FormikInput
                name="phone"
                label={appEnums.FormLabel.PHONE_NUMBER}
                placeholder={appEnums.FormPlaceholder.ENTER_PHONE_NUMBER}
                keyboardType="phone-pad"
                isRequired
                containerStyle={styles.inputContainer}
              />

              <FormikInput
                name="bio"
                label={appEnums.FormLabel.BIO}
                placeholder={appEnums.FormPlaceholder.TELL_ABOUT_YOURSELF}
                multiline
                numberOfLines={3}
                containerStyle={[styles.inputContainer, styles.bioContainer]}
                style={styles.bioInput}
              />

              <View style={styles.buttonContainer}>
                <ButtonPrimary
                  title={appEnums.ButtonLabel.SAVE_CHANGES}
                  onPress={handleSubmit}
                  disabled={!isValid || !dirty || loading}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>

      <ProgressDialog visible={loading} />

      {/* Image Picker Modal */}
      <ActionModal
        visible={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        title={appEnums.ModalTitle.CHANGE_PROFILE_PICTURE}
        message={appEnums.ModalMessage.CHOOSE_AN_OPTION}
        type="info"
        icon="camera"
        buttons={[
          {
            text: appEnums.ButtonLabel.CAMERA,
            onPress: () => {
              setToastMessage(appEnums.FeatureMessage.COMING_SOON);
            },
            style: 'default',
          },
          {
            text: appEnums.ButtonLabel.PHOTO_LIBRARY,
            onPress: () => {
              setToastMessage(appEnums.FeatureMessage.COMING_SOON);
            },
            style: 'default',
          },
          {
            text: appEnums.ButtonLabel.CANCEL,
            onPress: () => {},
            style: 'cancel',
          },
        ]}
      />
    </View>
  );
};

export default EditProfileScreen;
