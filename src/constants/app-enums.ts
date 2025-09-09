// Screen Titles
export enum ScreenTitle {
  PROFILE = 'Profile',
  EDIT_PROFILE = 'Edit Profile',
  ORDER_HISTORY = 'Order History',
  ONGOING_ORDERS = 'Ongoing Orders',
  CONTACTS = 'Contacts',
  FAVORITES = 'Favorites',
  SHOPPING_CART = 'Shopping Cart',
  HOME = 'Home',
  LOGIN = 'Login',
  SIGNUP = 'Sign Up',
  FORGOT_PASSWORD = 'Forgot Password',
  PASSWORD_RESET_SUCCESS = 'Password Reset',
  MAP = 'Map',
  CHAT = 'Chat',
  PRODUCT = 'Product Details',
  SETTINGS = 'Settings',
  ABOUT = 'About',
  PAYMENT_METHODS = 'Payment Methods',
  ADD_PAYMENT_METHOD = 'Add Payment Method',
  EDIT_PAYMENT_METHOD = 'Edit Payment Method',
  ADDRESSES = 'Addresses',
  ADD_ADDRESS = 'Add Address',
  EDIT_ADDRESS = 'Edit Address',
  HELP_SUPPORT = 'Help & Support',
}

// Form Labels
export enum FormLabel {
  FULL_NAME = 'Full Name',
  EMAIL_ADDRESS = 'Email Address',
  PASSWORD = 'Password',
  CONFIRM_PASSWORD = 'Confirm Password',
  PHONE_NUMBER = 'Phone Number',
  BIO = 'Bio (Optional)',
  SEARCH = 'Search',
  SEARCH_FAVORITES = 'Search favorites...',
  SEARCH_CONTACTS = 'Search...',
}

// Form Placeholders
export enum FormPlaceholder {
  ENTER_FULL_NAME = 'Enter your full name',
  ENTER_EMAIL = 'Enter your email',
  ENTER_EMAIL_ADDRESS = 'Enter your email address',
  ENTER_PASSWORD = 'Enter your password',
  ENTER_PHONE_NUMBER = 'Enter your phone number',
  TELL_ABOUT_YOURSELF = 'Tell us about yourself...',
  SEARCH = 'Search...',
  SEARCH_FAVORITES = 'Search favorites...',
  SEARCH_CONTACTS = 'Search...',
  ENTER_CITY_NAME = 'Enter city name',
  ENTER_AREA_NAME = 'Enter area name',
  TYPE_MESSAGE = 'Type a message',
}

// Button Labels
export enum ButtonLabel {
  LOGIN = 'Login',
  SIGNUP = 'Sign Up',
  LOGOUT = 'Logout',
  SAVE_CHANGES = 'Save Changes',
  CANCEL = 'Cancel',
  CONFIRM = 'Confirm',
  CONFIRM_LOCATION = 'Confirm Location',
  SEND = 'Send',
  CAMERA = 'Camera',
  GALLERY = 'Gallery',
  PHOTO_LIBRARY = 'Photo Library',
  BROWSE_MENU = 'Browse Menu',
  ADD_TO_CART = 'Add to Cart',
  REMOVE_ITEM = 'Remove Item',
  CLEAR_CART = 'Clear Cart',
  REMOVE_FROM_FAVORITES = 'Remove from Favorites',
  CLEAR_ALL_FAVORITES = 'Clear All Favorites',
  CHANGE_PROFILE_PICTURE = 'Change Profile Picture',
  EDIT_PROFILE = 'Edit Profile',
  SEND_RESET_EMAIL = 'Send Reset Email',
  BACK_TO_LOGIN = 'Back to Login',
  RESEND_EMAIL = 'Resend Email',
  CONTINUE = 'Continue',
  GET_STARTED = 'Get Started',
  SKIP = 'Skip',
  ADD_PAYMENT_METHOD = 'Add Payment Method',
  ADD_ADDRESS = 'Add Address',
  EDIT = 'Edit',
  DELETE = 'Delete',
  SET_DEFAULT = 'Set as Default',
  NEXT = 'Next',
  PREVIOUS = 'Previous',
  DONE = 'Done',
  SUBMIT = 'Submit',
  RESET = 'Reset',
  REFRESH = 'Refresh',
  RETRY = 'Retry',
  CLOSE = 'Close',
  OK = 'OK',
  YES = 'Yes',
  NO = 'No',
}

// Modal Titles
export enum ModalTitle {
  LOGOUT = 'Logout',
  REMOVE_ITEM = 'Remove Item',
  CLEAR_CART = 'Clear Cart',
  REMOVE_FROM_FAVORITES = 'Remove from Favorites',
  CLEAR_ALL_FAVORITES = 'Clear All Favorites',
  CHANGE_PROFILE_PICTURE = 'Change Profile Picture',
  CONFIRM_ACTION = 'Confirm Action',
  ERROR = 'Error',
  SUCCESS = 'Success',
  WARNING = 'Warning',
  INFO = 'Information',
}

// Modal Messages
export enum ModalMessage {
  LOGOUT_CONFIRMATION = 'Are you sure you want to logout?',
  REMOVE_ITEM_CONFIRMATION = 'Are you sure you want to remove this item from your cart?',
  CLEAR_CART_CONFIRMATION = 'Are you sure you want to clear your cart?',
  REMOVE_FAVORITE_CONFIRMATION = 'Are you sure you want to remove this item from your favorites?',
  CLEAR_FAVORITES_CONFIRMATION = 'Are you sure you want to clear all favorites?',
  CAMERA_FEATURE_COMING_SOON = 'Camera feature coming soon!',
  PHOTO_LIBRARY_FEATURE_COMING_SOON = 'Photo Library feature coming soon!',
  PAYMENT_METHODS_COMING_SOON = 'Payment Methods feature coming soon!',
  ADDRESSES_COMING_SOON = 'Addresses feature coming soon!',
  NOTIFICATIONS_COMING_SOON = 'Notifications feature coming soon!',
  HELP_SUPPORT_COMING_SOON = 'Help & Support feature coming soon!',
  TERMS_CONDITIONS_COMING_SOON = 'Terms & Conditions feature coming soon!',
  PRIVACY_POLICY_COMING_SOON = 'Privacy Policy feature coming soon!',
  ABOUT_COMING_SOON = 'About feature coming soon!',
  CHOOSE_AN_OPTION = 'Choose an option',
}

// Toast Messages
export enum ToastMessage {
  PROFILE_UPDATED_SUCCESS = 'Profile updated successfully!',
  PROFILE_UPDATE_FAILED = 'Failed to update profile. Please try again.',
  LOGIN_SUCCESS = 'Login successful!',
  LOGIN_FAILED = 'Login failed. Please check your credentials.',
  SIGNUP_SUCCESS = 'Account created successfully!',
  SIGNUP_FAILED = 'Signup failed. Please try again.',
  PASSWORD_RESET_SENT = 'Password reset email sent!',
  PASSWORD_RESET_FAILED = 'Failed to send reset email. Please try again.',
  ITEM_ADDED_TO_CART = 'Item added to cart!',
  ITEM_REMOVED_FROM_CART = 'Item removed from cart!',
  CART_CLEARED = 'Cart cleared!',
  ITEM_ADDED_TO_FAVORITES = 'Item added to favorites!',
  ITEM_REMOVED_FROM_FAVORITES = 'Item removed from favorites!',
  FAVORITES_CLEARED = 'All favorites cleared!',
  ORDER_PLACED_SUCCESS = 'Order placed successfully!',
  ORDER_PLACED_FAILED = 'Failed to place order. Please try again.',
  NETWORK_ERROR = 'Network error. Please check your connection.',
  SOMETHING_WENT_WRONG = 'Something went wrong. Please try again.',
  FEATURE_COMING_SOON = 'This feature is coming soon!',
}

// Error Messages
export enum ErrorMessage {
  REQUIRED_FIELD = 'This field is required',
  INVALID_EMAIL = 'Please enter a valid email address',
  INVALID_PASSWORD = 'Password must be at least 6 characters',
  PASSWORDS_DO_NOT_MATCH = 'Passwords do not match',
  INVALID_PHONE = 'Please enter a valid phone number',
  NETWORK_ERROR = 'Network error. Please check your connection.',
  SERVER_ERROR = 'Server error. Please try again later.',
  UNAUTHORIZED = 'You are not authorized to perform this action.',
  FORBIDDEN = 'Access denied.',
  NOT_FOUND = 'Resource not found.',
  VALIDATION_ERROR = 'Please check your input and try again.',
  UNKNOWN_ERROR = 'An unknown error occurred.',
}

// Success Messages
export enum SuccessMessage {
  OPERATION_SUCCESSFUL = 'Operation completed successfully!',
  DATA_SAVED = 'Data saved successfully!',
  DATA_UPDATED = 'Data updated successfully!',
  DATA_DELETED = 'Data deleted successfully!',
  EMAIL_SENT = 'Email sent successfully!',
  PASSWORD_CHANGED = 'Password changed successfully!',
  PROFILE_UPDATED = 'Profile updated successfully!',
  ACCOUNT_CREATED = 'Account created successfully!',
  LOGIN_SUCCESSFUL = 'Login successful!',
  LOGOUT_SUCCESSFUL = 'Logged out successfully!',
}

// Loading Messages
export enum LoadingMessage {
  LOADING = 'Loading...',
  SAVING = 'Saving...',
  UPDATING = 'Updating...',
  DELETING = 'Deleting...',
  SENDING = 'Sending...',
  PROCESSING = 'Processing...',
  CONNECTING = 'Connecting...',
  AUTHENTICATING = 'Authenticating...',
  UPLOADING = 'Uploading...',
  DOWNLOADING = 'Downloading...',
}

// Empty State Messages
export enum EmptyStateMessage {
  NO_ITEMS = 'No items found',
  NO_FAVORITES = 'No favorites yet',
  NO_ORDERS = 'No orders found',
  NO_CONTACTS = 'No contacts found',
  NO_PRODUCTS = 'No products found',
  NO_RESULTS = 'No results found',
  CART_EMPTY = 'Your cart is empty',
  FAVORITES_EMPTY = 'Your favorites list is empty',
  ORDERS_EMPTY = "You haven't placed any orders yet",
  CONTACTS_EMPTY = 'No contacts available',
  PRODUCTS_EMPTY = 'No products available',
  SEARCH_EMPTY = 'No results for your search',
}

// Empty State Subtitles
export enum EmptyStateSubtitle {
  ADD_ITEMS_TO_CART = 'Add some items to your cart to get started',
  ADD_FAVORITES = 'Add items to your favorites to see them here',
  PLACE_ORDER = 'Place your first order to see it here',
  ADD_CONTACTS = 'Add contacts to see them here',
  BROWSE_PRODUCTS = 'Browse our menu to see available products',
  TRY_DIFFERENT_SEARCH = 'Try searching with different keywords',
  CHECK_CONNECTION = 'Check your internet connection and try again',
}

// Tab Labels
export enum TabLabel {
  HOME = 'Home',
  FAVORITES = 'Favorites',
  CART = 'Cart',
  PROFILE = 'Profile',
  ORDERS = 'Orders',
  CONTACTS = 'Contacts',
  CHAT = 'Chat',
  MAP = 'Map',
  SETTINGS = 'Settings',
  MENU = 'Menu',
}

// Navigation Labels
export enum NavigationLabel {
  BACK = 'Back',
  CLOSE = 'Close',
  MENU = 'Menu',
  SEARCH = 'Search',
  FILTER = 'Filter',
  SORT = 'Sort',
  REFRESH = 'Refresh',
  SHARE = 'Share',
  MORE = 'More',
  SETTINGS = 'Settings',
}

// Validation Messages
export enum ValidationMessage {
  REQUIRED = 'This field is required',
  EMAIL_INVALID = 'Please enter a valid email address',
  PASSWORD_TOO_SHORT = 'Password must be at least 6 characters',
  PASSWORD_TOO_LONG = 'Password must be less than 50 characters',
  PASSWORDS_DO_NOT_MATCH = 'Passwords do not match',
  PHONE_INVALID = 'Please enter a valid phone number',
  NAME_TOO_SHORT = 'Name must be at least 2 characters',
  NAME_TOO_LONG = 'Name must be less than 50 characters',
  BIO_TOO_LONG = 'Bio must be less than 150 characters',
  INVALID_FORMAT = 'Invalid format',
  MIN_LENGTH = 'Minimum length required',
  MAX_LENGTH = 'Maximum length exceeded',
}

// Feature Messages
export enum FeatureMessage {
  COMING_SOON = 'This feature is coming soon!',
  UNDER_DEVELOPMENT = 'This feature is under development',
  BETA_FEATURE = 'This is a beta feature',
  PREMIUM_FEATURE = 'This is a premium feature',
  MAINTENANCE_MODE = 'This feature is temporarily unavailable',
}

// Icons
export enum AppIcon {
  HOME = 'home',
  FAVORITES = 'heart',
  CART = 'shopping-cart',
  PROFILE = 'account',
  ORDERS = 'package-variant',
  CONTACTS = 'contacts',
  CHAT = 'chat',
  MAP = 'map',
  SETTINGS = 'cog',
  MENU = 'menu',
  SEARCH = 'magnify',
  FILTER = 'filter',
  SORT = 'sort',
  REFRESH = 'refresh',
  SHARE = 'share',
  MORE = 'dots-horizontal',
  BACK = 'arrow-left',
  CLOSE = 'close',
  CHECK = 'check',
  PLUS = 'plus',
  MINUS = 'minus',
  EDIT = 'pencil',
  DELETE = 'delete',
  SAVE = 'content-save',
  CANCEL = 'close-circle',
  CONFIRM = 'check-circle',
  WARNING = 'alert-circle',
  ERROR = 'alert-circle-outline',
  INFO = 'information',
  SUCCESS = 'check-circle-outline',
  LOADING = 'loading',
  CAMERA = 'camera',
  GALLERY = 'image',
  PHONE = 'phone',
  EMAIL = 'email',
  LOCATION = 'map-marker',
  TIME = 'clock',
  CALENDAR = 'calendar',
  STAR = 'star',
  STAR_OUTLINE = 'star-outline',
  HEART = 'heart',
  HEART_OUTLINE = 'heart-outline',
  SHOPPING_CART = 'shopping-cart',
  SHOPPING_CART_OUTLINE = 'shopping-cart-outline',
  ACCOUNT = 'account',
  ACCOUNT_OUTLINE = 'account-outline',
  LOGOUT = 'logout',
  LOGIN = 'login',
  SIGNUP = 'account-plus',
  PASSWORD = 'lock',
  PASSWORD_OUTLINE = 'lock-outline',
  EYE = 'eye',
  EYE_OFF = 'eye-off',
  ARROW_LEFT = 'arrow-left',
  ARROW_RIGHT = 'arrow-right',
  ARROW_UP = 'arrow-up',
  ARROW_DOWN = 'arrow-down',
  CHEVRON_LEFT = 'chevron-left',
  CHEVRON_RIGHT = 'chevron-right',
  CHEVRON_UP = 'chevron-up',
  CHEVRON_DOWN = 'chevron-down',
}

// Status Messages
export enum StatusMessage {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
  CONNECTING = 'Connecting...',
  CONNECTED = 'Connected',
  DISCONNECTED = 'Disconnected',
  SYNCING = 'Syncing...',
  SYNCED = 'Synced',
  UPDATING = 'Updating...',
  UPDATED = 'Updated',
  SAVING = 'Saving...',
  SAVED = 'Saved',
  LOADING = 'Loading...',
  LOADED = 'Loaded',
  ERROR = 'Error',
  SUCCESS = 'Success',
  WARNING = 'Warning',
  INFO = 'Info',
}

// Permission Messages
export enum PermissionMessage {
  CAMERA_PERMISSION = 'Camera permission is required to take photos',
  GALLERY_PERMISSION = 'Gallery permission is required to select photos',
  LOCATION_PERMISSION = 'Location permission is required for this feature',
  NOTIFICATION_PERMISSION = 'Notification permission is required for alerts',
  STORAGE_PERMISSION = 'Storage permission is required to save files',
  MICROPHONE_PERMISSION = 'Microphone permission is required for voice features',
  CONTACTS_PERMISSION = 'Contacts permission is required to access contacts',
  CALENDAR_PERMISSION = 'Calendar permission is required to access calendar',
}

// Accessibility Labels
export enum AccessibilityLabel {
  BUTTON = 'Button',
  TEXT_INPUT = 'Text input',
  IMAGE = 'Image',
  ICON = 'Icon',
  CARD = 'Card',
  LIST_ITEM = 'List item',
  HEADER = 'Header',
  FOOTER = 'Footer',
  NAVIGATION = 'Navigation',
  TAB = 'Tab',
  MODAL = 'Modal',
  ALERT = 'Alert',
  LOADING = 'Loading',
  ERROR = 'Error',
  SUCCESS = 'Success',
  WARNING = 'Warning',
  INFO = 'Information',
}

// Accessibility Hints
export enum AccessibilityHint {
  DOUBLE_TAP_TO_ACTIVATE = 'Double tap to activate',
  DOUBLE_TAP_TO_EDIT = 'Double tap to edit',
  DOUBLE_TAP_TO_DELETE = 'Double tap to delete',
  SWIPE_TO_DELETE = 'Swipe to delete',
  SWIPE_TO_EDIT = 'Swipe to edit',
  LONG_PRESS_TO_EDIT = 'Long press to edit',
  LONG_PRESS_TO_DELETE = 'Long press to delete',
  TAP_TO_OPEN = 'Tap to open',
  TAP_TO_CLOSE = 'Tap to close',
  TAP_TO_SELECT = 'Tap to select',
  TAP_TO_DESELECT = 'Tap to deselect',
}
