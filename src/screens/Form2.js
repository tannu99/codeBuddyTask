import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, Header, Input} from '../component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {navigate} from '../navigation/RouterServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Form2() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [address, setAddress] = useState('');
  const [errorFirst, setFirstError] = useState('');
  const [errorLast, setLastError] = useState('');
  const [errorAddress, setAddressError] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('First Name').then(item => {
      if (item) {
        setFirst(item);
      }
    });
    AsyncStorage.getItem('Last Name').then(item => {
      if (item) {
        setLast(item);
      }
    });
    AsyncStorage.getItem('Address').then(item => {
      if (item) {
        setAddress(item);
      }
    });
  }, []);

  const validData = () => {
    if (!first) {
      setFirstError('First Name is required!');
      return false;
    } else if (!first.match(/^[a-zA-Z]{2,50}$/)) {
      setFirstError(
        'First Name must have minimum 2 and maximum 50 alphabets only.',
      );
      return false;
    } else if (last && !last.match(/^[a-zA-Z]/)) {
      setLastError('Last name allow only alphabets.');
      return false;
    } else if (!address) {
      setAddressError('Address is required!');
      return false;
    } else if (address && address.length < 10) {
      setAddressError('Address must be grater than 10 characters.');
      return false;
    }
    return true;
  };

  const onNext = async () => {
    if (!validData()) return;
    Keyboard.dismiss();
    try {
      await AsyncStorage.setItem('First Name', first);
      await AsyncStorage.setItem('Last Name', last);
      await AsyncStorage.setItem('Address', address);

      navigate('Form3');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <Header show={true} title={'Step 2'} />

      <ScrollView
        style={{marginTop: '35%'}}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.input_container}>
          <Input
            label={'Firstname*'}
            placeholder={'Enter firstname..'}
            value={first}
            onChange={text => {
              setFirstError(''), setFirst(text);
            }}
            error={errorFirst}
          />
          <Input
            label={'Lastname'}
            value={last}
            placeholder={'Enter lastname..'}
            onChange={text => {
              setLastError(''), setLast(text);
            }}
            error={errorLast}
          />
          <Input
            label={'Address*'}
            value={address}
            placeholder={'Enter address..'}
            onChange={text => {
              setAddressError(''), setAddress(text);
            }}
            error={errorAddress}
          />
        </View>

        <Button text={'Save & Next'} onPress={() => onNext()} />
      </ScrollView>
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
    width: wp('100%'),
    paddingTop: hp('1%'),
  },
});
