// Product and Menu Interfaces
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
  ingredients?: string[];
  nutrition?: NutritionInfo;
}

interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  ingredients: string[];
  nutrition: NutritionInfo;
}

// Address Interfaces
interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber?: string;
  isDefault: boolean;
  instructions?: string;
}

interface AddressFormData {
  type: 'home' | 'work' | 'other';
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
  instructions: string;
  isDefault: boolean;
}

// Payment Method Interfaces
interface PaymentMethod {
  id: string;
  type: any; // Will be typed as orderEnums.PaymentMethod in usage
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  name?: string;
  email?: string;
  phoneNumber?: string;
}

interface PaymentMethodFormData {
  type: any; // Will be typed as orderEnums.PaymentMethod in usage
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
  email: string;
  phoneNumber: string;
  isDefault: boolean;
}

// Settings Interface
interface SettingsItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  screen?: string; // Will be typed as keyof typeof ScreenEnum in usage
  onPress?: () => void;
  showChevron?: boolean;
}

// Profile Interface
interface IProfileOption {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  onPress: () => void;
  isDestructive?: boolean;
}

// Chat Interface
interface IMessage {
  id: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'other';
}

// Contact Interface
interface InboxItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  isRead: boolean;
  type: 'support' | 'order' | 'general';
}

// Map Interface
interface IProps {
  city: string;
  area: string;
}

// Help & Support Interfaces
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

// Edit Profile Interface
interface EditProfileFormValues {
  name: string;
  email: string;
  phone: string;
  bio: string;
}

export type {
  Address,
  AddressFormData,
  ContactMethod,
  EditProfileFormValues,
  FAQItem,
  IMessage,
  InboxItem,
  IProfileOption,
  IProps,
  MenuItem,
  NutritionInfo,
  PaymentMethod,
  PaymentMethodFormData,
  Product,
  SettingsItem,
};
