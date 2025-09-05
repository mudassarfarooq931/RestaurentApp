import {CustomImage, PrimaryHeader} from '@components';
import {faker} from '@faker-js/faker';
import React, {useEffect} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import SectionList from 'react-native-tabs-section-list';
import {styles} from './styles';

const SECTIONS = [
  {
    title: 'Burgers',
    data: Array(5)
      .fill(0)
      .map(_ => ({
        title: faker.commerce.productName(),
        description: faker.lorem.lines(2),
        price: faker.commerce.price(),
      })),
  },
  {
    title: 'Pizza',
    data: Array(5)
      .fill(0)
      .map(_ => ({
        title: faker.commerce.productName(),
        description: faker.lorem.lines(2),
        price: faker.commerce.price(),
      })),
  },
  {
    title: 'Sushi and rolls',
    data: Array(10)
      .fill(0)
      .map(_ => ({
        title: faker.commerce.productName(),
        description: faker.lorem.lines(2),
        price: faker.commerce.price(),
      })),
  },
  {
    title: 'Salads',
    data: Array(10)
      .fill(0)
      .map(_ => ({
        title: faker.commerce.productName(),
        description: faker.lorem.lines(2),
        price: faker.commerce.price(),
      })),
  },
  {
    title: 'Dessert',
    data: Array(10)
      .fill(0)
      .map(_ => ({
        title: faker.commerce.productName(),
        description: faker.lorem.lines(2),
        price: faker.commerce.price(),
      })),
  },
];

const width = Dimensions.get('window').width;

const HomeScreen: React.FC = () => {
  useEffect(() => {}, []);

  const list = [
    {
      id: '1',
      uri: 'https://plus.unsplash.com/premium_photo-1685314947151-074d2892c6ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNsaWRlciUyMGZhc3QlMjBmb29kJTIwZGVhbHMlMjBob3Jpem9udGFsfGVufDB8fDB8fHww',
    },
    {
      id: '2',
      uri: 'https://images.unsplash.com/photo-1460306855393-0410f61241c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHNsaWRlciUyMGZhc3QlMjBmb29kJTIwZGVhbHMlMjBob3Jpem9udGFsfGVufDB8fDB8fHww',
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1450152021501-598b36b17449?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHNsaWRlciUyMGZhc3QlMjBmb29kJTIwZGVhbHMlMjBob3Jpem9udGFsfGVufDB8fDB8fHww',
    },
    {
      id: '4',
      uri: 'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fHNsaWRlciUyMGZhc3QlMjBmb29kJTIwZGVhbHMlMjBob3Jpem9udGFsfGVufDB8fDB8fHww',
    },
  ];

  return (
    <View style={styles.container}>
      <PrimaryHeader title="Menu" isDrawer />
      <View style={{height: 200, width: width}}>
        <SwiperFlatList
          autoplay
          autoplayLoop
          pagingEnabled
          // showPagination
          data={list}
          renderItem={({item, index}) => (
            <View style={styles.cardImg}>
              <CustomImage url={item?.uri} imageStyles={styles.logo} />
            </View>
          )}
        />
      </View>
      <SectionList
        sections={SECTIONS}
        keyExtractor={item => item.title}
        stickySectionHeadersEnabled={false}
        scrollToLocationOffset={50}
        tabBarStyle={styles.tabBar}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderTab={({title, isActive}) => (
          <View
            style={[
              styles.tabContainer,
              {borderBottomWidth: isActive ? 1 : 0},
            ]}>
            <Text
              style={[
                styles.tabText,
                {color: isActive ? '#090909' : '#9e9e9e'},
              ]}>
              {title}
            </Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View>
            <View style={styles.sectionHeaderContainer} />
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemRow}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
