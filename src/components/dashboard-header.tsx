import {colors, fonts} from '@constants';
import React, {useEffect} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Text} from 'react-native';

//---------------------
interface DashboardHeaderProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  interval?: number;
}

//-------------------------------------
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  interval = 5000,
  style,
}) => {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  const openDrawer = () => {
    navigation?.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View>
      <View style={[styles.container, style]}>
        <TouchableOpacity style={styles.iconWrapper} onPress={openDrawer}>
          <MaterialCommunityIcons name="menu" size={30} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default DashboardHeader;

//--------------------------------
const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    backgroundColor: colors.red,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    height: 33,
    width: 33,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },

  title: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.MONTSERRAT_BOLD,
  },
  bgContainer: {
    height: 270,
    backgroundColor: colors.primary,
    width: '130%',
    borderRadius: 175,
    position: 'absolute',
    zIndex: -10,
    top: -40,
    alignSelf: 'center',
  },
  dashboard: {
    fontSize: 20,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.white,
    textAlign: 'center',
    width: '100%',
    paddingTop: 18,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.headingDark,
    textAlign: 'left',
  },
  subHeading: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.headingDark,
    textAlign: 'left',
    paddingTop: 12,
  },
  detail: {
    height: 53,
    fontSize: 13,
    color: colors.metallicBlack,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    textAlign: 'justify',
    paddingTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateRow: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateHeading: {
    fontSize: 12,
    color: colors.headingDark,
    fontFamily: fonts.MONTSERRAT_BOLD,
  },
  date: {
    fontSize: 10,
    color: colors.metallicBlack,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    paddingLeft: 10,
  },
  forwardSlide: {
    zIndex: 1,
    height: 170,
    width: '56%',
    alignSelf: 'flex-end',
    borderRadius: 20,
    position: 'absolute',
  },
  backwardSlide: {
    zIndex: 1,
    height: 170,
    width: '56%',
    alignSelf: 'flex-start',
    borderRadius: 20,
    position: 'absolute',
  },
  noAnnouncemetWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAnnouncemetText: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.white,
    textAlign: 'center',
    width: '100%',
  },
  iconWrapper: {
    padding: 5,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.metallicBlack,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
});
