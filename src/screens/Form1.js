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

export function Form1() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [errorEmail, setEmailError] = useState('');
  const [errorPassword, setPasswordError] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('Email').then(storedEmail => {
      if (storedEmail) {
        setEmail(storedEmail);
      }
    });
    AsyncStorage.getItem('Password').then(storedPassword => {
      if (storedPassword) {
        setPassword(storedPassword);
      }
    });
  }, []);

  const validData = () => {
    if (!email) {
      setEmailError('Email Id is required!');
      return false;
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Email Id is not valid!');
      return false;
    } else if (!password) {
      setPasswordError('Password is required!');
      return false;
    } else if (
      !password.match(
        /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[\W_].*[\W_])[\S]{8,}$/,
      )
    ) {
      setPasswordError(
        'Password must contain minimum of 2 capital letters, 2 small letters, 2 numbers, and 2 special characters',
      );
      return false;
    }
    return true;
  };

  const onNext = async () => {
    if (!validData()) return;
    Keyboard.dismiss();
    try {
      await AsyncStorage.setItem('Email', email);
      await AsyncStorage.setItem('Password', password);

      navigate('Form2');
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
      <Header show={false} title={'Step 1'} />

      <ScrollView
        style={{marginTop: '35%'}}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.input_container}>
          <Input
            label={'Email Id*'}
            value={email}
            onChange={text => {
              setEmailError(''), setEmail(text);
            }}
            error={errorEmail}
            placeholder={'Enter Email Id..'}
          />
          <Input
            label={'Password*'}
            value={password}
            onChange={text => {
              setPasswordError(''), setPassword(text);
            }}
            show={true}
            secureTextEntry={secure}
            onPress={() => setSecure(!secure)}
            error={errorPassword}
            placeholder={'Enter Password..'}
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
