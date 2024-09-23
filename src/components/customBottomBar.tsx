import {ScreenEnum, colors, fonts} from '@constants';
import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import CHAT_ACTIVE from '../assets/svgs/chat-active.svg';
import CHAT from '../assets/svgs/chat-unactive.svg';
import HOME_ACTIVE from '../assets/svgs/home-active.svg';
import HOME from '../assets/svgs/home-unactive.svg';
import {connect} from 'react-redux';
import {RootState} from '@redux/store';

//--------------------

interface CustomTabBarProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  totalUnread: number;
}

// ------------------------------------

const mapStateToProps = (state: RootState) => {
  return {
    totalUnread: state.inbox.totalUnread,
  };
};

//-------------------------------------
const TabBottomBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  totalUnread,
}) => {
  return (
    <View style={styles.bar}>
      <View style={styles.innerView}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options?.tabBarLabel !== undefined
              ? options?.tabBarLabel
              : options?.title !== undefined
              ? options?.title
              : route?.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation?.emit({
              type: 'tabPress',
              target: route?.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation?.navigate(route?.name);
            }
          };

          return (
            <TouchableOpacity
              key={route?.name}
              disabled={isFocused ? true : false}
              accessibilityRole="button"
              accessibilityLabel={options?.tabBarAccessibilityLabel}
              testID={options?.tabBarTestID}
              onPress={onPress}
              style={styles.tabView}>
              {isFocused ? (
                label == ScreenEnum.Chat ? (
                  <View>
                    {totalUnread > 0 ? (
                      <View
                        style={
                          totalUnread > 99
                            ? styles.countMaxActive
                            : styles.countActive
                        }>
                        <Text style={styles.countTextActive}>
                          {totalUnread > 99 ? '99+' : totalUnread}
                        </Text>
                      </View>
                    ) : null}
                    <CHAT_ACTIVE height={40} width={40} />
                  </View>
                ) : (
                  <HOME_ACTIVE height={40} width={40} />
                )
              ) : label == ScreenEnum.Chat ? (
                <View>
                  {totalUnread > 0 ? (
                    <View
                      style={totalUnread > 99 ? styles.countMax : styles.count}>
                      <Text style={styles.countText}>
                        {totalUnread > 99 ? '99+' : totalUnread}
                      </Text>
                    </View>
                  ) : null}
                  <CHAT height={25} width={25} />
                </View>
              ) : (
                <HOME height={25} width={25} />
              )}
              {isFocused ? null : (
                <Text style={styles?.labelStyle}>{label.toString()}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default connect(mapStateToProps)(TabBottomBar);

//--------------------------------
const styles = StyleSheet.create({
  innerView: {
    height: 60,
    flexDirection: 'row',
    elevation: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.background,
    borderTopWidth: 0.7,
    borderColor: '#e6e6e6',
    shadowOffset: {width: 1, height: 1},
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    marginBottom: Platform.OS === 'ios' ? -5 : 0,
  },
  labelStyle: {
    color: colors.primary,
    fontSize: 8,
    paddingTop: 4,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
  tabView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    backgroundColor: colors.white,
  },
  countText: {
    fontSize: 10,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.white,
  },
  count: {
    height: 22,
    width: 22,
    borderRadius: 11,
    backgroundColor: colors.primaryDarker,
    borderColor: colors.primaryDarker,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -8,
    top: -5,
    zIndex: 99999,
  },
  countTextActive: {
    fontSize: 10,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.primaryDarker,
  },
  countActive: {
    height: 22,
    width: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
    borderColor: colors.primaryDarker,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: -5,
    zIndex: 99999,
  },
  countMax: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryDarker,
    borderColor: colors.primaryDarker,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -10,
    top: -8,
    zIndex: 99999,
  },
  countMaxActive: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderColor: colors.primaryDarker,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -8,
    top: -5,
    zIndex: 99999,
  },
});
