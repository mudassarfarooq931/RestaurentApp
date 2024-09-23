import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PrimaryHeader} from '@components';

const CartScreen = () => {
  return (
    <View>
      <PrimaryHeader
        style={{justifyContent: 'center', alignItems: 'center'}}
        title="Cart"
        textStyle={{textAlign: 'center'}}
      />
      <View style={styles.container}>
        <Text>CartScreen</Text>
      </View>
    </View>
  );
};

export default CartScreen;
