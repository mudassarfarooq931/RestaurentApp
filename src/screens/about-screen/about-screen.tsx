import {PrimaryHeader} from '@components';
import {appEnums, colors} from '@constants';
import React from 'react';
import {Linking, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles';

interface AboutItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  onPress?: () => void;
  showChevron?: boolean;
}

const AboutScreen: React.FC = () => {
  const aboutItems: AboutItem[] = [
    {
      id: '1',
      title: 'App Version',
      subtitle: '1.0.0',
      icon: 'information-outline',
    },
    {
      id: '2',
      title: 'Terms of Service',
      subtitle: 'Read our terms and conditions',
      icon: 'file-document-outline',
      onPress: () => {
        // TODO: Open terms of service
        Linking.openURL('https://example.com/terms');
      },
      showChevron: true,
    },
    {
      id: '3',
      title: 'Privacy Policy',
      subtitle: 'How we protect your data',
      icon: 'shield-account-outline',
      onPress: () => {
        // TODO: Open privacy policy
        Linking.openURL('https://example.com/privacy');
      },
      showChevron: true,
    },
    {
      id: '4',
      title: 'Open Source Licenses',
      subtitle: 'Third-party libraries we use',
      icon: 'code-tags',
      onPress: () => {
        // TODO: Show open source licenses
      },
      showChevron: true,
    },
    {
      id: '5',
      title: 'Contact Us',
      subtitle: 'Get in touch with our team',
      icon: 'email-outline',
      onPress: () => {
        // TODO: Open contact form or email
        Linking.openURL('mailto:support@example.com');
      },
      showChevron: true,
    },
  ];

  const handleItemPress = (item: AboutItem) => {
    if (item.onPress) {
      item.onPress();
    }
  };

  const renderAboutItem = ({item}: {item: AboutItem}) => (
    <TouchableOpacity
      style={styles.aboutItem}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.7}>
      <View style={styles.itemContent}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={item.icon}
            size={24}
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
            size={24}
            color={colors.gray}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <PrimaryHeader title={appEnums.ScreenTitle.ABOUT} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* App Info Section */}
        <View style={styles.appInfoSection}>
          <View style={styles.appIconContainer}>
            <MaterialCommunityIcons
              name="food"
              size={60}
              color={colors.white}
            />
          </View>
          <Text style={styles.appName}>CharityApp</Text>
          <Text style={styles.appDescription}>
            Your favorite food delivery app for a good cause
          </Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>

        {/* About Items */}
        <View style={styles.aboutItemsContainer}>
          {aboutItems.map(item => renderAboutItem({item}))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 CharityApp. All rights reserved.
          </Text>
          <Text style={styles.footerSubtext}>
            Made with ❤️ for a better world
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;
