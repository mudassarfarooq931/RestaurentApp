import {PrimaryHeader} from '@components';
import ProgressDialog from '@components/progress-dialog';
import {colors, fonts} from '@constants';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface IProfileOption {
  label: string;
  onPress: () => void;
}

const ProfileScreen: React.FC = () => {
  const profileOptions: IProfileOption[] = [
    {label: 'Edit Profile', onPress: () => console.log('Edit Profile Pressed')},
    {label: 'Settings', onPress: () => console.log('Settings Pressed')},
    {label: 'Privacy', onPress: () => console.log('Privacy Pressed')},
    {
      label: 'Logout',
      onPress: () => {
        setTimeout(() => {
          setLoading(false);
          Alert.alert('Logout Success');
        }, 1000);
        setLoading(true);
        console.log('Logout Pressed');
      },
    },
  ];
  const [loading, setLoading] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PrimaryHeader
        style={{justifyContent: 'center', alignItems: 'center'}}
        title="Profile"
        textStyle={{textAlign: 'center'}}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.profileContainer}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/3.jpg'}} // Replace with your profile image URL
            style={styles.profileImage}
          />
          <Text style={styles.username}>John Doe</Text>
        </View>
        <View style={styles.optionsContainer}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={index}
              style={styles.optionButton}
              onPress={option.onPress}>
              <Text
                style={[
                  styles.optionText,
                  option.label === 'Logout' && styles.logoutText,
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <ProgressDialog visible={loading} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    backgroundColor: colors.background,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circular profile image
    marginBottom: 10,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  username: {
    fontSize: 20,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontFamily: fonts.MONTSERRAT_SEMIBOLD,
    color: colors.black,
    fontSize: 16,
  },
  logoutText: {
    color: colors.red, // Change this to your desired color
  },
});

export default ProfileScreen;
