import {PrimaryHeader} from '@components';
import {faker} from '@faker-js/faker';
import React, {useEffect} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import SectionList from 'react-native-tabs-section-list';
import {styles} from './styles';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

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

  const list = [...new Array(6).keys()];

  return (
    <View style={styles.container}>
      <PrimaryHeader
        title="ABHA"
        style={styles.header}
        textStyle={{textAlign: 'center'}}
      />
      <View style={{height: 200, width: width}}>
        <SwiperFlatList
          autoplay
          autoplayLoop
          pagingEnabled
          // showPagination
          data={list}
          renderItem={({index}) => (
            <View style={styles.cardImg}>
              <Image source={require('@images/ABHA.png')} style={styles.logo} />
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
            style={[styles.tabContainer, {borderBottomWidth: isActive ? 1 : 0}]}
          >
            <Text
              style={[
                styles.tabText,
                {color: isActive ? '#090909' : '#9e9e9e'},
              ]}
            >
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
