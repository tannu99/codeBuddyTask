import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export function Button({text, onPress, disabled}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.ButtonStyle,
        backgroundColor: disabled ? 'grey' : 'black',
      }}
      disabled={disabled}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text
        style={{
          ...styles.TextStyle,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonStyle: {
    borderRadius: 5,
    width: wp('90%'),
    paddingVertical: 10,
    paddingHorizontal: 10,

    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('5%'),
    marginTop: hp('2%'),
  },

  TextStyle: {
    textAlign: 'center',

    color: 'white',
    margin: 0,
    padding: 0,
  },
});
