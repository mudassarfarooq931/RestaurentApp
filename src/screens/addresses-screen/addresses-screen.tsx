import {ButtonPrimary, PrimaryHeader} from '@components';
import {appEnums, colors, ScreenEnum} from '@constants';
import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigate} from '../../../root-navigation';
import {Address} from '../../types/custom-types';
import styles from './styles';

const AddressesScreen: React.FC = () => {
  // TODO: Replace with actual addresses from Redux/API
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      name: 'Home',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phoneNumber: '+1 (555) 123-4567',
      isDefault: true,
      instructions: 'Leave at front door',
    },
    {
      id: '2',
      type: 'work',
      name: 'Office',
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      phoneNumber: '+1 (555) 987-6543',
      isDefault: false,
      instructions: 'Call when you arrive',
    },
    {
      id: '3',
      type: 'other',
      name: "Mom's House",
      address: '789 Family Lane',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      country: 'United States',
      isDefault: false,
    },
  ]);

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case 'home':
        return 'home';
      case 'work':
        return 'briefcase';
      case 'other':
        return 'map-marker';
      default:
        return 'map-marker';
    }
  };

  const getAddressTypeColor = (type: string) => {
    switch (type) {
      case 'home':
        return colors.primary;
      case 'work':
        return colors.primary;
      case 'other':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev =>
      prev.map(address => ({
        ...address,
        isDefault: address.id === id,
      })),
    );
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(address => address.id !== id));
  };

  const handleEditAddress = (id: string) => {
    const address = addresses.find(addr => addr.id === id);
    if (address) {
      navigate(ScreenEnum.EditAddress, {address});
    }
  };

  const handleAddAddress = () => {
    navigate(ScreenEnum.AddAddress);
  };

  const renderAddress = ({item}: {item: Address}) => (
    <View style={styles.addressItem}>
      <View style={styles.addressContent}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={getAddressTypeIcon(item.type)}
            size={24}
            color={getAddressTypeColor(item.type)}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.addressHeader}>
            <Text style={styles.addressName}>{item.name}</Text>
            {item.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
          <Text style={styles.addressText}>{item.address}</Text>
          <Text style={styles.addressText}>
            {item.city}, {item.state} {item.zipCode}
          </Text>
          <Text style={styles.addressText}>{item.country}</Text>
          {item.phoneNumber && (
            <Text style={styles.phoneText}>📞 {item.phoneNumber}</Text>
          )}
          {item.instructions && (
            <Text style={styles.instructionsText}>📝 {item.instructions}</Text>
          )}
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditAddress(item.id)}>
          <MaterialCommunityIcons
            name="pencil"
            size={16}
            color={colors.primary}
          />
          <Text style={styles.actionButtonText}>
            {appEnums.ButtonLabel.EDIT}
          </Text>
        </TouchableOpacity>
        {!item.isDefault && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSetDefault(item.id)}>
            <MaterialCommunityIcons
              name="star"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.actionButtonText}>
              {appEnums.ButtonLabel.SET_DEFAULT}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteAddress(item.id)}>
          <MaterialCommunityIcons name="delete" size={16} color={colors.red} />
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
            {appEnums.ButtonLabel.DELETE}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons
        name="map-marker-outline"
        size={80}
        color={colors.gray}
      />
      <Text style={styles.emptyTitle}>No Addresses</Text>
      <Text style={styles.emptySubtitle}>
        Add an address to make ordering easier
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <PrimaryHeader title={appEnums.ScreenTitle.ADDRESSES} />
      {addresses.length > 0 ? (
        <FlatList
          data={addresses}
          renderItem={renderAddress}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
      <View style={styles.addButtonContainer}>
        <ButtonPrimary
          title={appEnums.ButtonLabel.ADD_ADDRESS}
          onPress={handleAddAddress}
        />
      </View>
    </View>
  );
};

export default AddressesScreen;
