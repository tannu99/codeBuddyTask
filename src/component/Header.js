import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {goBack} from '../navigation/RouterServices';
import {ArrowLeft} from 'iconsax-react-native';

export const Header = ({show, title, arrow}) => {
  return (
    <View
      style={{
        height: hp('6%'),
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        width: wp('100%'),
        // alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: arrow ? 10 : 16,
        backgroundColor: 'black',
        // justifyContent: 'center',
      }}>
      {show ? (
        <TouchableOpacity onPress={() => goBack()}>
          <ArrowLeft size="32" color={'white'} />
        </TouchableOpacity>
      ) : null}
      <Text
        numberOfLines={1}
        style={{
          ...style.text,
          marginLeft: show ? wp('32%') : wp('40%'),
        }}>
        {title}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    paddingBottom: Platform.OS == 'android' ? hp('0.5%') : 0,

    fontSize: 20,
    alignSelf: 'center',
  },
});
