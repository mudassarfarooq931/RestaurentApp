import {CustomModal, OrderSummaryComponent, PrimaryHeader} from '@components';
import ProgressDialog from '@components/progress-dialog';
import {appEnums, colors, ScreenEnum} from '@constants';
import {setCurrentUser} from '@redux/slice/auth/auth-slice';
import {setToastMessage} from '@redux/slice/common/toast-message-slice';
import {RootState} from '@redux/store';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../../root-navigation';
import {syncFavoritesData} from '../../utils';
import {styles} from './styles';

interface IProfileOption {
  label: string;
  icon: string;
  onPress: () => void;
  isDestructive?: boolean;
}

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  // Get cart and favorites data
  const cartItems = useSelector((state: RootState) => state.cart?.items || []);
  const favorites = useSelector(
    (state: RootState) => state.favorites?.items || [],
  );
  const totalCartItems = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0,
  );
  const totalFavorites = favorites.length;

  // Sync favorites data on component mount
  useEffect(() => {
    syncFavoritesData();
  }, []);

  // TODO: Replace with actual user data from Redux
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    stats: {
      orders: 24,
      favorites: totalFavorites,
      reviews: 8,
    },
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(setCurrentUser(undefined));
      dispatch(setToastMessage('Logged out successfully'));
      setLogoutModal(false);
    }, 1500);
  };

  const profileOptions: IProfileOption[] = [
    {
      label: 'Order History',
      icon: 'history',
      onPress: () => {
        navigate(ScreenEnum.OrderHistory);
      },
    },
    {
      label: 'Ongoing Orders',
      icon: 'clock',
      onPress: () => {
        navigate(ScreenEnum.OngoingOrders);
      },
    },
    {
      label: 'Payment Methods',
      icon: 'credit-card',
      onPress: () => {
        navigate(ScreenEnum.PaymentMethods);
      },
    },
    {
      label: 'Addresses',
      icon: 'map-marker',
      onPress: () => {
        navigate(ScreenEnum.Addresses);
      },
    },
    {
      label: 'Settings',
      icon: 'cog',
      onPress: () => {
        navigate(ScreenEnum.Settings);
      },
    },
    {
      label: 'Help & Support',
      icon: 'help-circle',
      onPress: () => {
        navigate(ScreenEnum.HelpSupport);
      },
    },
    {
      label: 'About',
      icon: 'information',
      onPress: () => {
        navigate(ScreenEnum.About);
      },
    },
  ];

  return (
    <View style={styles.container}>
      <PrimaryHeader title={appEnums.ScreenTitle.PROFILE} isDrawer />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* Profile Header */}
        <View style={styles.profileContainer}>
          <Image source={{uri: user.avatar}} style={styles.profileImage} />
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => {
              navigate(ScreenEnum.EditProfile);
            }}
            activeOpacity={0.8}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* User Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.orders}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.favorites}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.reviews}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Order Summary */}
        <OrderSummaryComponent
          onViewAllOrders={() => navigate(ScreenEnum.OrderHistory)}
        />

        {/* Profile Options */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.optionsContainer}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={option.onPress}
              activeOpacity={0.7}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={24}
                  color={option.isDestructive ? colors.red : colors.primary}
                />
              </View>
              <Text
                style={[
                  styles.optionText,
                  option.isDestructive && styles.logoutText,
                ]}>
                {option.label}
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={colors.gray}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <CustomModal
        visible={logoutModal}
        onClose={() => setLogoutModal(false)}
        title={appEnums.ModalTitle.LOGOUT}
        message={appEnums.ModalMessage.LOGOUT_CONFIRMATION}
        primaryButtonText={appEnums.ButtonLabel.LOGOUT}
        secondaryButtonText={appEnums.ButtonLabel.CANCEL}
        onPrimaryPress={handleLogout}
        onSecondaryPress={() => setLogoutModal(false)}
        type="warning"
        icon="logout"
      />

      <ProgressDialog visible={loading} />
    </View>
  );
};

export default ProfileScreen;
