import {PrimaryHeader} from '@components';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';

const HomeScreen: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <PrimaryHeader
        title="ABHA"
        style={styles.header}
        textStyle={{textAlign: 'center'}}
      />
      <View style={styles.wrapper}>
        <View style={styles.cardImg}>
          <Image source={require('@images/ABHA.png')} style={styles.logo} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
