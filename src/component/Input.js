import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StyleSheet, Text, View} from 'react-native';

export const Input = ({
  label,
  value,
  onChange,
  disabled,
  show,
  secureTextEntry,
  onPress,
  error,
  multiline,
  maxLength,
  numberOfLines,
  placeholder
}) => {
  return (
    <View style={styles.container}>
      <Text style={{alignSelf: 'flex-start', fontSize: 18,color:"black"}}>{label}</Text>
      <TextInput
        mode="outlined"
        style={{...styles.input_container}}
        // label={label}
        outlineColor={error ? 'red' : 'grey'}
        activeOutlineColor={error ? 'red' : 'grey'}
        textColor={'black'}
        outlineStyle={{borderWidth: 0.5}}
        numberOfLines={numberOfLines}
        value={value}
        ellipsizeMode="tail"
        multiline={multiline}
        onChangeText={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        secureTextEntry={secureTextEntry}
        right={
          show ? (
            <TextInput.Icon
              icon={secureTextEntry ? 'eye-off' : 'eye'}
              iconColor={'grey'}
              onPress={onPress}
            />
          ) : null
        }
      />
      {error ? <Text style={{...styles.errorText}}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
    width: wp('90%'),
    alignSelf: 'center',
  },
  input_container: {
    width: wp('90%'),
    alignSelf: 'center',
    margin: 8,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    paddingVertical: 0,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    width: wp('90%'),
  },
});
