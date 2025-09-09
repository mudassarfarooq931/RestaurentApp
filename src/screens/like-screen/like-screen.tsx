import {CustomModal, PrimaryHeader} from '@components';
import {appEnums, colors, ScreenEnum} from '@constants';
import {addToCart} from '@redux/slice/cart/cart-slice';
import {setToastMessage} from '@redux/slice/common/toast-message-slice';
import {
  clearFavorites,
  FavoriteItem,
  removeFromFavorites,
  removeMultipleFromFavorites,
} from '@redux/slice/favorites/favorites-slice';
import {RootState} from '@redux/store';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../../root-navigation';
import {syncFavoritesData} from '../../utils';
import {styles} from './styles';

const LikeScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites?.items || [],
  );
  const totalFavorites = useSelector(
    (state: RootState) => state.favorites?.totalItems || 0,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [removeModal, setRemoveModal] = useState({
    visible: false,
    itemId: '',
    itemTitle: '',
  });
  const [clearModal, setClearModal] = useState(false);

  // Sync favorites data on component mount
  useEffect(() => {
    syncFavoritesData();
  }, []);

  // Get unique categories
  const categories: string[] = [
    'All',
    ...Array.from(
      new Set<string>(favorites.map((item: FavoriteItem) => item.category)),
    ),
  ];

  const filteredFavorites = favorites.filter((item: FavoriteItem) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRemoveItem = (itemId: string, itemTitle: string) => {
    setRemoveModal({
      visible: true,
      itemId,
      itemTitle,
    });
  };

  const handleRemoveConfirm = () => {
    dispatch(removeFromFavorites(removeModal.itemId));
    dispatch(setToastMessage('Item removed from favorites'));
    setRemoveModal({
      visible: false,
      itemId: '',
      itemTitle: '',
    });
  };

  const handleClearFavorites = () => {
    setClearModal(true);
  };

  const handleClearConfirm = () => {
    dispatch(clearFavorites());
    dispatch(setToastMessage('All favorites cleared'));
    setClearModal(false);
    setSelectedItems([]);
    setIsSelectionMode(false);
  };

  const handleSelectItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id: string) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredFavorites.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredFavorites.map((item: FavoriteItem) => item.id));
    }
  };

  const handleRemoveSelected = () => {
    if (selectedItems.length > 0) {
      dispatch(removeMultipleFromFavorites(selectedItems));
      dispatch(
        setToastMessage(`${selectedItems.length} items removed from favorites`),
      );
      setSelectedItems([]);
      setIsSelectionMode(false);
    }
  };

  const handleProductPress = (item: FavoriteItem) => {
    navigate(ScreenEnum.Product, {
      product: {
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        image: item.image,
        category: item.category,
        rating: item.rating,
        reviews: item.reviews,
        ingredients: [
          'Fresh Ingredients',
          'Premium Quality',
          'Handcrafted',
          'Delicious',
        ],
        nutrition: {
          calories: 450,
          protein: 25,
          carbs: 35,
          fat: 20,
        },
      },
    });
  };

  const handleAddToCart = (item: FavoriteItem) => {
    const cartItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      category: item.category,
      quantity: 1,
      selectedSize: 'Medium',
      selectedExtras: [],
      totalPrice: parseFloat(item.price.replace('$', '')) || 0,
    };

    dispatch(addToCart(cartItem));
    dispatch(setToastMessage(`${item.title} added to cart!`));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(setToastMessage('Favorites refreshed'));
    }, 1000);
  };

  const renderFavoriteItem = ({item}: {item: FavoriteItem}) => (
    <TouchableOpacity
      style={styles.favoriteItem}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.8}>
      <View style={styles.itemContent}>
        <Image source={{uri: item.image}} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>

          {/* Category Tag */}
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{item.category}</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons
              name="star"
              size={14}
              color={colors.yellow_dark}
            />
            <Text style={styles.ratingText}>
              {item.rating} ({item.reviews} reviews)
            </Text>
          </View>

          <View style={styles.itemFooter}>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item)}
                activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="cart-plus"
                  size={18}
                  color={colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id, item.title)}
                activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="heart"
                  size={20}
                  color={colors.red}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="heart-outline"
        size={100}
        color={colors.gray}
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start adding items to your favorites by tapping the heart icon on any
        product you love! Your favorites will appear here for easy access.
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigate(ScreenEnum.Home)}
        activeOpacity={0.8}>
        <Text style={styles.browseButtonText}>Browse Menu</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <PrimaryHeader title={appEnums.ScreenTitle.FAVORITES} isDrawer>
        {totalFavorites > 0 ? (
          <TouchableOpacity
            onPress={() => setIsSelectionMode(!isSelectionMode)}
            activeOpacity={0.7}>
            <MaterialCommunityIcons
              name={isSelectionMode ? 'close' : 'check-circle-outline'}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        ) : undefined}
      </PrimaryHeader>

      {totalFavorites > 0 && (
        <>
          {/* Header with count */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>My Favorites</Text>
            <Text style={styles.favoritesCount}>
              {totalFavorites} {totalFavorites === 1 ? 'item' : 'items'}
            </Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={appEnums.FormPlaceholder.SEARCH_FAVORITES}
              placeholderTextColor={colors.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Category Filters */}
          {categories?.length > 1 && (
            <View style={styles.filterContainer}>
              <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item: string) => item}
                renderItem={({item}: {item: string}) => (
                  <TouchableOpacity
                    style={[
                      styles.filterButton,
                      selectedCategory === item && styles.filterButtonActive,
                    ]}
                    onPress={() => setSelectedCategory(item as string)}
                    activeOpacity={0.7}>
                    <Text
                      style={[
                        styles.filterButtonText,
                        selectedCategory === item &&
                          styles.filterButtonTextActive,
                      ]}>
                      {item as string}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* Bulk Actions */}
          {isSelectionMode && (
            <View style={styles.bulkActionsContainer}>
              <TouchableOpacity
                style={styles.selectAllButton}
                onPress={handleSelectAll}
                activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name={
                    selectedItems.length === filteredFavorites.length
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.selectAllText}>
                  {selectedItems.length === filteredFavorites.length
                    ? 'Deselect All'
                    : 'Select All'}
                </Text>
              </TouchableOpacity>

              {selectedItems.length > 0 && (
                <TouchableOpacity
                  style={styles.removeSelectedButton}
                  onPress={handleRemoveSelected}
                  activeOpacity={0.7}>
                  <Text style={styles.removeSelectedText}>
                    Remove ({selectedItems.length})
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </>
      )}

      {/* Content */}
      <View style={styles.contentContainer}>
        {totalFavorites === 0 ? (
          renderEmptyState()
        ) : filteredFavorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="magnify"
              size={60}
              color={colors.gray}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>No Results Found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search terms or browse all favorites.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredFavorites}
            renderItem={renderFavoriteItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.primary]}
                tintColor={colors.primary}
              />
            }
            contentContainerStyle={styles.flatListContent}
            style={styles.flatList}
            nestedScrollEnabled={true}
          />
        )}
      </View>

      {/* Remove Item Modal */}
      <CustomModal
        visible={removeModal.visible}
        onClose={() =>
          setRemoveModal({visible: false, itemId: '', itemTitle: ''})
        }
        title={appEnums.ModalTitle.REMOVE_FROM_FAVORITES}
        message={`Are you sure you want to remove "${removeModal.itemTitle}" from your favorites?`}
        primaryButtonText={appEnums.ButtonLabel.REMOVE_FROM_FAVORITES}
        secondaryButtonText={appEnums.ButtonLabel.CANCEL}
        onPrimaryPress={handleRemoveConfirm}
        onSecondaryPress={() =>
          setRemoveModal({visible: false, itemId: '', itemTitle: ''})
        }
        type="warning"
        icon="heart-remove"
      />

      {/* Clear All Modal */}
      <CustomModal
        visible={clearModal}
        onClose={() => setClearModal(false)}
        title={appEnums.ModalTitle.CLEAR_ALL_FAVORITES}
        message={appEnums.ModalMessage.CLEAR_FAVORITES_CONFIRMATION}
        primaryButtonText={appEnums.ButtonLabel.CLEAR_ALL_FAVORITES}
        secondaryButtonText={appEnums.ButtonLabel.CANCEL}
        onPrimaryPress={handleClearConfirm}
        onSecondaryPress={() => setClearModal(false)}
        type="error"
        icon="delete-sweep"
      />
    </View>
  );
};

export default LikeScreen;
