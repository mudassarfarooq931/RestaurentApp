import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo, useEffect} from 'react';
import {connect} from 'react-redux';
import store, {RootState} from '@redux/store';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, ScreenEnum, yupSchemas} from '@constants';
import {goBack, navigate} from '../../../root-navigation';
import {
  clearAllMapState,
  setArea,
  setCity,
} from '@redux/slice/common/map-slice';
import {ButtonPrimary, Input} from '@components';
import {HelperService} from '@services';
import {formatDate} from 'date-fns';
import {setToastMessage} from '@redux/slice/common/toast-message-slice';

interface IProps {
  city: string;
  area: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    city: state.map.city,
    area: state.map.area,
  };
};

const MapScreen = memo(({city, area}: IProps) => {
  const dispatch = store.store.dispatch;

  useEffect(() => {
    return () => {
      dispatch(clearAllMapState());
    };
  }, []);

  const handleLocateMe = () => {
    dispatch(setCity('Lahore'));
    dispatch(setArea('Johar Town'));
  };

  const handleConfirmLocation = async () => {
    const formData = {city: city, address: area};
    const {
      data,
      msg,
      error,
    } = await HelperService?.getInstance()?.isSchemaValid(
      yupSchemas.MapSchema,
      formData,
    );
    if (data) {
      dispatch(clearAllMapState());
      navigate(ScreenEnum.Login);
    } else {
      dispatch(setToastMessage(msg));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          goBack();
        }}
        activeOpacity={0.6}
        style={styles.btnBack}
      >
        <Ionicons name="chevron-back" color={colors.black} size={22} />
      </TouchableOpacity>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.btnLocate}
          activeOpacity={0.6}
          onPress={handleLocateMe}
        >
          <Text style={styles.textLocate}>Locate Me</Text>
          <MaterialIcons name="my-location" color={colors.black} size={22} />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.heading}>Please select your location</Text>
          <Text style={styles.label}>City/Region</Text>
          <Input
            style={styles.input}
            onChangeText={v => {
              dispatch(setCity(v));
            }}
            value={city}
            placeholder="Type here..."
            textStyle={{color: colors.black}}
            keyboardType={'ascii-capable'}
            multiLine={false}
          />
          <Text style={styles.label}>Area/Sub-Region</Text>
          <Input
            style={styles.input}
            onChangeText={v => {
              dispatch(setArea(v));
            }}
            value={area}
            placeholder="Type here..."
            textStyle={{color: colors.black}}
            keyboardType={'ascii-capable'}
            multiLine={false}
          />
        </View>

        <ButtonPrimary
          title="Confirm Location"
          onPress={handleConfirmLocation}
          style={styles.btnConfirm}
          textStyle={styles.textConfirm}
        />
      </View>
    </View>
  );
});

export default connect(mapStateToProps)(MapScreen);
