import {colors} from '@constants';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Main container with background
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Parallax header container
  parallaxHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    zIndex: 5,
  },

  // Background image container
  backgroundImageContainer: {
    flex: 1,
  },

  // Background image
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  // Image overlay
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  // Header content container
  headerContentContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 2,
  },

  // Header buttons row
  headerButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Header button
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  // Header button with margin
  headerButtonWithMargin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  // Sticky header
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },

  // Sticky header button
  stickyHeaderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lighterGray,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  // Sticky header button with margin
  stickyHeaderButtonWithMargin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  // Product info container
  productInfoContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: -20,
  },

  // Product title row
  productTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Product price
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },

  // Product rating row
  productRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  // Category tag
  categoryTag: {
    backgroundColor: colors.lighterGray,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // Category tag text
  categoryTagText: {
    fontSize: 12,
    color: colors.gray,
  },

  // Description container
  descriptionContainer: {
    marginTop: 20,
  },

  // Description title
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 12,
  },

  // Description text
  descriptionText: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
  },

  // Size options container
  sizeOptionsContainer: {
    marginTop: 20,
  },

  // Size options title
  sizeOptionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 12,
  },

  // Size options row
  sizeOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Size option button
  sizeOptionButton: {
    flex: 1,
    backgroundColor: colors.lighterGray,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  // Size option button selected
  sizeOptionButtonSelected: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  // Size option text
  sizeOptionText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },

  // Size option text selected
  sizeOptionTextSelected: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
  },

  // Extras container
  extrasContainer: {
    marginTop: 20,
  },

  // Extras title
  extrasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 12,
  },

  // Extras list
  extrasList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  // Add to cart container
  addToCartContainer: {
    flex: 1,
  },

  // Add to cart button
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },

  // Add to cart button text
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },

  // Header Styles
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
  },

  imageContainer: {
    flex: 1,
    width: '100%',
  },

  headerImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 2,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },

  headerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerRatingText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },

  headerReviewsText: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },

  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },

  floatingActionButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 2,
  },

  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },

  // Content Container
  contentContainer: {
    flex: 1,
    marginTop: 300, // Start below the header
    backgroundColor: colors.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  // Product Info Card
  productInfoCard: {
    backgroundColor: colors.white,
    margin: 20,
    marginTop: 30,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },

  productHeader: {
    marginBottom: 15,
  },

  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 5,
  },

  reviewsText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 5,
  },

  productDescription: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 24,
    marginBottom: 15,
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },

  category: {
    fontSize: 14,
    color: colors.gray,
    backgroundColor: colors.lighterGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },

  // Section Cards
  sectionCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
  },

  // Size Selection
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sizeButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lighterGray,
    backgroundColor: colors.white,
    alignItems: 'center',
  },

  sizeButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  sizeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray,
  },

  sizeButtonTextSelected: {
    color: colors.white,
  },

  // Extras Selection
  extraItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },

  extraInfo: {
    flex: 1,
  },

  extraName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },

  extraPrice: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 2,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.lighterGray,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  // Ingredients
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },

  ingredientText: {
    fontSize: 14,
    color: colors.gray,
    marginLeft: 5,
  },

  // Nutrition
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  nutritionItem: {
    width: '48%',
    backgroundColor: colors.lighterGray,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  nutritionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },

  nutritionLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },

  // Bottom Action Bar
  bottomActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 30, // Extra padding for safe area
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
    borderRadius: 25,
    paddingHorizontal: 5,
    marginRight: 15,
  },

  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 20,
  },
});

export default styles;
