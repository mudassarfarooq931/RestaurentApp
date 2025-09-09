import {PrimaryHeader} from '@components';
import {appEnums, colors, ScreenEnum} from '@constants';
import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigate} from '../../../root-navigation';
import {SettingsItem} from '../../types/custom-types';
import styles from './styles';

const SettingsScreen: React.FC = () => {
  const settingsItems: SettingsItem[] = [
    {
      id: '1',
      title: appEnums.ScreenTitle.ABOUT,
      subtitle: 'App version, terms, privacy',
      icon: 'information-outline',
      screen: ScreenEnum.About,
      showChevron: true,
    },
    {
      id: '2',
      title: appEnums.ScreenTitle.PAYMENT_METHODS,
      subtitle: 'Manage your payment methods',
      icon: 'credit-card-outline',
      screen: ScreenEnum.PaymentMethods,
      showChevron: true,
    },
    {
      id: '3',
      title: appEnums.ScreenTitle.ADDRESSES,
      subtitle: 'Manage your addresses',
      icon: 'map-marker-outline',
      screen: ScreenEnum.Addresses,
      showChevron: true,
    },
    {
      id: '4',
      title: 'Notifications',
      subtitle: 'Push notifications, email alerts',
      icon: 'bell-outline',
      onPress: () => {
        // TODO: Navigate to notifications settings
      },
      showChevron: true,
    },
    {
      id: '5',
      title: 'Privacy & Security',
      subtitle: 'Account security, data privacy',
      icon: 'shield-account-outline',
      onPress: () => {
        // TODO: Navigate to privacy settings
      },
      showChevron: true,
    },
    {
      id: '6',
      title: 'Help & Support',
      subtitle: 'FAQ, contact support',
      icon: 'help-circle-outline',
      screen: ScreenEnum.HelpSupport,
      showChevron: true,
    },
  ];

  const handleItemPress = (item: SettingsItem) => {
    if (item.screen) {
      navigate(item.screen);
    } else if (item.onPress) {
      item.onPress();
    }
  };

  const renderSettingsItem = ({item}: {item: SettingsItem}) => (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}>
      <View style={styles.itemContent}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={item.icon}
            size={26}
            color={colors.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          )}
        </View>
        {item.showChevron && (
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            color={colors.gray}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <PrimaryHeader title={appEnums.ScreenTitle.SETTINGS} />
      <FlatList
        data={settingsItems}
        renderItem={renderSettingsItem}
        keyExtractor={item => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default SettingsScreen;
