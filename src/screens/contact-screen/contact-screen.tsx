import {colors, fonts, ScreenEnum} from '@constants';
import React, {memo, useState, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ListRenderItem,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Input, PrimaryHeader} from '@components';
import {navigate} from '../../../root-navigation';

interface InboxItem {
  id: string;
  username: string;
  profileImage: string; // URL or local path for the image
  lastMsg: string;
  lastMsgTime: string; // e.g., "2 minutes ago"
}

// Mock function to simulate fetching data from a server
const fetchMoreData = (page: number): Promise<InboxItem[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      // This is just mock data. Replace with actual API call.
      const newData = staticData.slice(page * 8, (page + 1) * 8);
      resolve(newData);
    }, 1000); // Simulate network delay
  });
};

const staticData: InboxItem[] = [
  {
    id: '1',
    username: 'Iron Man',
    profileImage:
      'https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg',
    lastMsg: 'I am Iron Man.',
    lastMsgTime: '1 minute ago',
  },
  {
    id: '2',
    username: 'Captain America',
    profileImage:
      'https://cdn.pixabay.com/photo/2021/11/12/14/33/captain-america-6789190_1280.jpg',
    lastMsg: 'Shield up!',
    lastMsgTime: '5 minutes ago',
  },
  {
    id: '3',
    username: 'Scarlet Witch',
    profileImage:
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/97/Scarlet_Witch.jpg/revision/latest/scale-to-width-down/1200?cb=20231021153444',
    lastMsg: 'I can alter reality.',
    lastMsgTime: '1 hour ago',
  },
  {
    id: '4',
    username: 'Thanos',
    profileImage:
      'https://cdn.vox-cdn.com/thumbor/S7APkbn99b1oVsds_1JBhvdzsWU=/0x0:2000x1000/1400x1400/filters:focal(814x298:815x299)/cdn.vox-cdn.com/uploads/chorus_asset/file/10440907/Thanos_MCU.jpg',
    lastMsg: 'I am inevitable.',
    lastMsgTime: '2 hours ago',
  },
  {
    id: '5',
    username: 'Thor',
    profileImage:
      'https://cdn.pixabay.com/photo/2024/02/24/15/43/ai-generated-8594264_1280.jpg',
    lastMsg: 'By the power of Asgard!',
    lastMsgTime: '10 minutes ago',
  },
  {
    id: '6',
    username: 'Hulk',
    profileImage:
      'https://cdn.pixabay.com/photo/2024/05/07/00/59/hulk-8744607_1280.jpg',
    lastMsg: 'Hulk smash!',
    lastMsgTime: '15 minutes ago',
  },
  {
    id: '7',
    username: 'Black Widow',
    profileImage:
      'https://cdn.pixabay.com/photo/2022/04/22/11/04/natasha-romanoff-7149465_1280.png',
    lastMsg: 'Need backup.',
    lastMsgTime: '20 minutes ago',
  },
  {
    id: '8',
    username: 'Hawkeye',
    profileImage:
      'https://cinegoon.wordpress.com/wp-content/uploads/2013/05/hawkeye_the_avengers_2012_movie-wallpaper-1920x10801.jpg',
    lastMsg: 'On target.',
    lastMsgTime: '25 minutes ago',
  },
  {
    id: '9',
    username: 'Doctor Strange',
    profileImage:
      'https://cdn.pixabay.com/photo/2024/05/14/10/51/ai-generated-8760871_1280.png',
    lastMsg: 'Time is relative.',
    lastMsgTime: '30 minutes ago',
  },
  {
    id: '10',
    username: 'Spider-Man',
    profileImage:
      'https://cdn.pixabay.com/photo/2023/07/30/13/07/spiderman-8158916_1280.png',
    lastMsg: 'With great power...',
    lastMsgTime: '35 minutes ago',
  },
  {
    id: '11',
    username: 'Black Panther',
    profileImage:
      'https://i.guim.co.uk/img/media/6feb81252f6ac486500a7532cd5ab7fedd0484af/248_0_1800_1080/master/1800.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=db8c4ea0065d2e4034a88ccc93f749ec',
    lastMsg: 'Wakanda forever!',
    lastMsgTime: '40 minutes ago',
  },
  {
    id: '12',
    username: 'Ant-Man',
    profileImage:
      'https://cdn.vox-cdn.com/thumbor/iGN8__xuGt7NkluXdokG1nzHIdM=/0x0:1200x800/1200x800/filters:focal(486x321:678x513)/cdn.vox-cdn.com/uploads/chorus_image/image/71986130/MilesAntMan_MarvelStudios_Getty_Ringer.0.jpg',
    lastMsg: 'Size does matter.',
    lastMsgTime: '45 minutes ago',
  },
  {
    id: '13',
    username: 'Star-Lord',
    profileImage:
      'https://static.wikia.nocookie.net/disneyfanon/images/a/a7/Profile_-_Star-Lord.jpg/revision/latest?cb=20210125011037',
    lastMsg: 'I am Groot.',
    lastMsgTime: '50 minutes ago',
  },
  {
    id: '14',
    username: 'Gamora',
    profileImage:
      'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/05/Gamora-feature.jpg',
    lastMsg: 'I’m not a monster.',
    lastMsgTime: '55 minutes ago',
  },
  {
    id: '15',
    username: 'Drax',
    profileImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXtOf-5o0jgau8blEpR_WI5Dn3FyAi09Z-jA&s',
    lastMsg: 'Nothing goes over my head!',
    lastMsgTime: '1 hour ago',
  },
  {
    id: '16',
    username: 'Wolverine',
    profileImage:
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/7/7c/Wolverine_Infobox.png/revision/latest?cb=20240522015042',
    lastMsg: 'Snikt!',
    lastMsgTime: '1 hour ago',
  },
  {
    id: '17',
    username: 'Cyclops',
    profileImage:
      'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/03/x-men-cyclops-powers-how-strong.jpg',
    lastMsg: 'Optic blast!',
    lastMsgTime: '1 hour ago',
  },
  {
    id: '18',
    username: 'Storm',
    profileImage:
      'https://i.namu.wiki/i/wlH3_tuLrL0KdexKKe1GSpjuCvAacVIy92qxDdBrhqFna1IJX0mn4reTtC7pXF3NlN2gw2Kbat9mPUrJ4rxjVQ.webp',
    lastMsg: 'The weather is clear.',
    lastMsgTime: '1 hour ago',
  },
  {
    id: '19',
    username: 'Jean Grey',
    profileImage:
      'https://static1.srcdn.com/wordpress/wp-content/uploads/2024/02/an-image-of-sophie-turner-as-jean-grey-with-professor-xavier-and-magneto-in-the-background.jpg',
    lastMsg: 'Phoenix is rising.',
    lastMsgTime: '1 hour ago',
  },
  {
    id: '20',
    username: 'Rogue',
    profileImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy8EijTiNGFr5OfVGpw6k1qZpDRR7m6zUi2A&s',
    lastMsg: 'I can touch you.',
    lastMsgTime: '1 hour ago',
  },
  {
    id: '21',
    username: 'Rocket Raccoon',
    profileImage: 'https://i.redd.it/8gjdsyrggqac1.jpeg',
    lastMsg: 'I am not a raccoon.',
    lastMsgTime: '1 hour ago',
  },
  {
    id: '22',
    username: 'Groot',
    profileImage:
      'https://cdn.vox-cdn.com/thumbor/c5VQwn71z9_TzxEUWFtCYEn4g3Y=/0x0:1200x696/1400x1400/filters:focal(631x178:632x179)/cdn.vox-cdn.com/uploads/chorus_asset/file/8378039/baby-groot-guardians.0.jpg',
    lastMsg: 'I am Groot!',
    lastMsgTime: '1 hour ago',
  },
];

const ContactScreen: React.FC = memo(() => {
  const [data, setData] = useState<InboxItem[]>(staticData.slice(0, 8));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<InboxItem[]>(data);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

  useEffect(() => {
    const handleSearch = () => {
      if (searchQuery.trim()) {
        const searchResults = data.filter(item =>
          item.username.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredData(searchResults);
        setIsSearchEmpty(searchResults.length === 0);
      } else {
        setFilteredData(data);
        setIsSearchEmpty(false);
      }
    };

    handleSearch();
  }, [searchQuery, data]);

  const loadMoreData = async () => {
    const newData = await fetchMoreData(currentPage);
    setData(prevData => [...prevData, ...newData]);
    setFilteredData(prevData => [...prevData, ...newData]);
    setCurrentPage(prevPage => prevPage + 1);
  };

  const renderItem: ListRenderItem<InboxItem> = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.6}
        onPress={() => {
          navigate(ScreenEnum?.Chat, {
            item: item,
          });
        }}>
        <Image source={{uri: item.profileImage}} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{item.username}</Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  const handleFabPress = () => {
    // Handle the FAB press action here
    navigate(ScreenEnum?.Contacts);
  };

  const renderEmptyComponent = () => {
    if (isSearchEmpty) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found</Text>
        </View>
      );
    }

    if (filteredData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Contacts</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <PrimaryHeader
        style={{justifyContent: 'center', alignItems: 'center'}}
        imgShow={false}
        title="Contacts"
        textStyle={{textAlign: 'center'}}
      />

      <Input
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyComponent}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1} // Trigger loadMoreData when scrolled 10% from bottom
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  headerText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
  },
  searchInput: {
    height: 45,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: colors.white,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
  },
  lastMsg: {
    fontSize: 14,
    color: '#555',
  },
  lastMsgTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactScreen;
