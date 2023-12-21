import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Header, Input} from '../component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CountryPicker from 'rn-country-picker';
import CheckBox from '@react-native-community/checkbox';
import {TextInput} from 'react-native-paper';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isValidPhoneNumber} from 'libphonenumber-js';

export function Form3() {
  const [countryCode, setCountryCode] = useState('+91');
  const [checked, setChecked] = React.useState(false);
  const [contact_no, setPhone] = useState('');
  const [errorPhone, setPhoneError] = useState('');
  const [errorCheck, setCheckError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [storedData, setStoredData] = useState([]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  let combine_phone =
    contact_no && contact_no.length ? countryCode + '' + contact_no : '';

  const selectedValue = value => {
    setPhoneError('');
    setCountryCode('+' + value);
  };
  const validData = () => {
    if (!countryCode) {
      setPhoneError('Country Code is required!');
      return false;
    } else if (!contact_no) {
      setPhoneError('Phone No. is required!');
      return false;
    } else if (contact_no && contact_no.length < 10) {
      setPhoneError('Phone No. must be of 10 numbers.');
      return false;
    } else if (combine_phone && !isValidPhoneNumber(combine_phone)) {
      setPhoneError('Contact Number is not valid!');
      return false;
    } else if (checked == false) {
      setCheckError('....');
      return false;
    }
    return true;
  };

  useEffect(() => {
    AsyncStorage.getItem('Country Code').then(item => {
      if (item) {
        setCountryCode(item);
      }
    });
    AsyncStorage.getItem('Phone No.').then(item => {
      if (item) {
        setPhone(item);
      }
    });
  }, []);

  const onSave = async () => {
    if (!validData()) return;
    Keyboard.dismiss();
    try {
      await AsyncStorage.setItem('Country Code', countryCode);
      await AsyncStorage.setItem('Phone No.', contact_no);
      await loadStoredData();
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  async function loadStoredData() {
    try {
      const keys = await AsyncStorage.getAllKeys();

      const result = await AsyncStorage.multiGet(keys);

      const data = result.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

      setStoredData(data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <Header show={true} title={'Step 3'} />

      <ScrollView
        style={{marginTop: '35%'}}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}>
        <View style={{alignSelf: 'center'}}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CountryPicker
                disable={false}
                animationType={'slide'}
                language="en"
                containerStyle={styles.pickerStyle}
                pickerTitleStyle={styles.pickerTitleStyle}
                selectedCountryTextStyle={styles.selectedCountryTextStyle}
                countryNameTextStyle={styles.countryNameTextStyle}
                pickerTitle={'Country Picker'}
                searchBarPlaceHolder={'Search'}
                hideCountryFlag={false}
                hideCountryCode={false}
                searchBarStyle={styles.searchBarStyle}
                countryCode={'91'}
                selectedValue={selectedValue}
              />

              <TextInput
                mode="outlined"
                style={styles.input_container}
                outlineColor={'grey'}
                activeOutlineColor={'grey'}
                textColor={'black'}
                outlineStyle={{borderWidth: 0.5}}
                value={contact_no}
                onChangeText={text => {
                  setPhone(text), setPhoneError('');
                }}
                error={errorPhone}
                keyboardType="numeric"
                maxLength={10}
                placeholder="Phone No.*"
              />
            </View>
            {errorPhone ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: wp('35%'),
                }}>
                {errorPhone}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: wp('90%'),
              marginTop: hp('1%'),
              marginLeft: wp('1%'),
            }}>
            <CheckBox
              style={{width: 20, height: 20}}
              disabled={false}
              value={checked}
              boxType="square"
              onValueChange={newValue => {
                setChecked(newValue), setCheckError('');
              }}
              onCheckColor={'green'}
              onTintColor={'green'}
              tintColors={{ true: 'green', false: 'black' }}
            />
            <Text
              style={{
                marginTop: hp('0.2%'),
                marginLeft: wp(Platform.OS == 'android' ? '3%' : '2.4%'),
                color: errorCheck ? 'red' : 'black',
              }}>
              {'I have agreed to Terms and Conditions *'}
            </Text>
          </View>
        </View>
        <View style={{marginLeft: wp('-2%')}}>
          <Button text={'Save'} onPress={() => onSave()} />
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={{justifyContent: 'flex-end', margin: 0}}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View
          style={{backgroundColor: 'white', padding: 22, alignItems: 'center'}}>
          {Object.entries(storedData).map(([key, value]) => (
            <View key={key} style={{flexDirection: 'row', marginLeft: '5%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 18,
                  width: '40%',
                }}>
                {key}:
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  width: '70%',
                  fontSize: 18,
                  color: 'grey',
                }}>
                {value}
              </Text>
            </View>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },

  input_container: {
    width: wp('57%'),
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  pickerStyle: {
    height: hp('7%'),
    width: wp('30%'),
    marginVertical: 10,
    borderColor: 'grey',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.5,
    fontSize: 16,
    color: '#000',
    // marginTop: hp('2%'),
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    color: '#000',
    textAlign: 'right',
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },

  searchBarStyle: {
    flex: 1,
    color:"black"
  },
});
