import {ButtonPrimary, PrimaryHeader} from '@components';
import {colors} from '@constants';
import React, {useState} from 'react';
import {
  FlatList,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isExpanded: boolean;
}

interface ContactMethod {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  onPress: () => void;
}

const HelpSupportScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: '1',
      question: 'How do I place an order?',
      answer:
        'To place an order, browse our menu, select your items, add them to cart, choose your delivery address and payment method, then confirm your order.',
      isExpanded: false,
    },
    {
      id: '2',
      question: 'How can I track my order?',
      answer:
        'You can track your order in real-time through the "Ongoing Orders" section in the app. You\'ll receive updates at each stage of preparation and delivery.',
      isExpanded: false,
    },
    {
      id: '3',
      question: 'What payment methods do you accept?',
      answer:
        'We accept credit cards, debit cards, PayPal, Apple Pay, Google Pay, EasyPaisa, JazzCash, and cash on delivery.',
      isExpanded: false,
    },
    {
      id: '4',
      question: 'How long does delivery take?',
      answer:
        'Delivery typically takes 30-45 minutes depending on your location and current order volume.',
      isExpanded: false,
    },
    {
      id: '5',
      question: 'Can I cancel my order?',
      answer:
        'You can cancel your order within 5 minutes of placing it. After that, please contact our support team.',
      isExpanded: false,
    },
    {
      id: '6',
      question: 'Do you offer refunds?',
      answer:
        "Yes, we offer refunds for orders that don't meet your expectations. Please contact support within 24 hours of delivery.",
      isExpanded: false,
    },
    {
      id: '7',
      question: 'How do I update my delivery address?',
      answer:
        'Go to Settings > Addresses to add, edit, or remove your delivery addresses.',
      isExpanded: false,
    },
    {
      id: '8',
      question: 'Is there a minimum order amount?',
      answer:
        'Yes, there is a minimum order amount of $10 to ensure efficient delivery service.',
      isExpanded: false,
    },
  ]);

  const contactMethods: ContactMethod[] = [
    {
      id: '1',
      title: 'Email Support',
      subtitle: 'Get help via email',
      icon: 'email-outline',
      onPress: () => {
        Linking.openURL(
          'mailto:support@charityapp.com?subject=Support Request',
        );
      },
    },
    {
      id: '2',
      title: 'Phone Support',
      subtitle: 'Call us directly',
      icon: 'phone-outline',
      onPress: () => {
        Linking.openURL('tel:+1234567890');
      },
    },
    {
      id: '3',
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      icon: 'chat-outline',
      onPress: () => {
        // TODO: Open live chat
      },
    },
    {
      id: '4',
      title: 'Report a Bug',
      subtitle: 'Help us improve the app',
      icon: 'bug-outline',
      onPress: () => {
        Linking.openURL('mailto:bugs@charityapp.com?subject=Bug Report');
      },
    },
  ];

  const filteredFAQ = faqItems.filter(
    item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleFAQ = (id: string) => {
    setFaqItems(prev =>
      prev.map(item =>
        item.id === id ? {...item, isExpanded: !item.isExpanded} : item,
      ),
    );
  };

  const renderFAQItem = ({item}: {item: FAQItem}) => (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => toggleFAQ(item.id)}
      activeOpacity={0.7}>
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <MaterialCommunityIcons
          name={item.isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={colors.primary}
        />
      </View>
      {item.isExpanded && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{item.answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderContactMethod = ({item}: {item: ContactMethod}) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={item.onPress}
      activeOpacity={0.7}>
      <View style={styles.contactContent}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={item.icon}
            size={24}
            color={colors.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.contactTitle}>{item.title}</Text>
          <Text style={styles.contactSubtitle}>{item.subtitle}</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={colors.gray}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <PrimaryHeader title="Help & Support" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={colors.gray}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for help..."
              placeholderTextColor={colors.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Quick Help Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Help</Text>
          <View style={styles.quickHelpGrid}>
            <TouchableOpacity style={styles.quickHelpItem}>
              <MaterialCommunityIcons
                name="help-circle"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.quickHelpText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickHelpItem}>
              <MaterialCommunityIcons
                name="phone"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.quickHelpText}>Call Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickHelpItem}>
              <MaterialCommunityIcons
                name="email"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.quickHelpText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickHelpItem}>
              <MaterialCommunityIcons
                name="chat"
                size={32}
                color={colors.primary}
              />
              <Text style={styles.quickHelpText}>Live Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <FlatList
            data={filteredFAQ}
            renderItem={renderFAQItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Contact Methods Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <FlatList
            data={contactMethods}
            renderItem={renderContactMethod}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Support Hours */}
        <View style={styles.section}>
          <View style={styles.supportHours}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color={colors.primary}
            />
            <View style={styles.supportHoursText}>
              <Text style={styles.supportHoursTitle}>Support Hours</Text>
              <Text style={styles.supportHoursSubtitle}>
                Monday - Friday: 9:00 AM - 6:00 PM{'\n'}
                Saturday - Sunday: 10:00 AM - 4:00 PM
              </Text>
            </View>
          </View>
        </View>

        {/* Feedback Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>We'd Love Your Feedback</Text>
          <Text style={styles.feedbackText}>
            Help us improve by sharing your thoughts and suggestions.
          </Text>
          <ButtonPrimary
            title="Send Feedback"
            onPress={() => {
              Linking.openURL(
                'mailto:feedback@charityapp.com?subject=App Feedback',
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpSupportScreen;
