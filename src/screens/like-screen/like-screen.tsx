import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PrimaryHeader} from '@components';

const LikeScreen = () => {
  return (
    <View style={styles.container}>
      <PrimaryHeader
        style={{justifyContent: 'center', alignItems: 'center'}}
        title="Favourite"
        textStyle={{textAlign: 'center'}}
      />
    </View>
  );
};

export default LikeScreen;
