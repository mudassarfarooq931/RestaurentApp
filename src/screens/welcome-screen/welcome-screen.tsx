import {colors} from '@constants';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.heading}>TRIM</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.top_row}>
          <Text style={styles.title}>Welcome to Trim Burgers</Text>
          <MaterialIcons
            name="waving-hand"
            size={25}
            color={colors.yellow_darkest}
          />
        </View>
        <Text style={styles.subtitle}>
          Please select your order type to continue
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            console.log('hit...');
          }}
          style={styles.bottom_row}
        >
          <View style={styles.row}>
            <View style={styles.circle_icon}>
              <MaterialCommunityIcons
                name="truck-fast-outline"
                size={25}
                color={colors.black}
              />
            </View>
            <Text style={styles.txt}>Delivery</Text>
          </View>
          <MaterialIcons name="chevron-right" size={25} color={colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
