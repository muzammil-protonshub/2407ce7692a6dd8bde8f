import React, {useState} from 'react';
import {ScrollView, TextInput, Button, StyleSheet} from 'react-native';
import {Routes} from '../constants';

export default (props) => {
  const [country, setCountry] = useState('');

  const submitHandler = () => {
    setCountry('');
    props.navigation.navigate(Routes.COUNTRY_DETAILS, {
      country,
    });
  };

  return (
    <ScrollView bounces={false} contentContainerStyle={Styles.container}>
      <TextInput
        value={country}
        style={Styles.input}
        placeholder="Enter country"
        onChangeText={(text) => setCountry(text.trim())}
      />
      <Button
        onPress={submitHandler}
        disabled={country.length === 0}
        title="submit"
      />
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'grey',
    paddingLeft: 10,
    marginBottom: 20,
  },
});
