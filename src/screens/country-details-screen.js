import React, {useEffect, useState} from 'react';
import {
  Alert,
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from 'react-native';
import Axios from 'axios';
import {SvgUri} from 'react-native-svg';

export default (props) => {
  const [countries, setCountries] = useState([]);
  const [weatherDetails, setWeatherDetails] = useState(null);

  useEffect(() => {
    console.log(props.route);
    if (props.route.params) {
      Axios.get(
        `https://restcountries.eu/rest/v2/name/${props.route.params.country}`,
      )
        .then((response) => {
          console.log(response);
          setCountries(response.data);
        })
        .catch((error) => {
          setCountries([]);
          Alert.alert('Error', error.message || 'Something went wrong');
        });
    }
  }, []);

  const getWeatherHandler = (capital) => {
    const response = Axios.get(
      `http://api.weatherstack.com/current?access_key=fe55ef451ade80aedfa8b1e88dfccbf4&query=${capital}`,
    )
      .then((response) => {
        console.log(response);
        setWeatherDetails(response.data.current);
      })
      .catch((error) => {
        setWeatherDetails(null);
        Alert.alert('Error', error.message || 'Something went wrong');
      });
  };

  return (
    <ScrollView contentContainerStyle={Styles.container}>
      {weatherDetails && (
        <View style={Styles.weatherDetailsContainer}>
          <Text style={Styles.weatherDetailsHeading}>
            Requested capital weather details:
          </Text>
          <Text>{`Temprature: ${weatherDetails.temperature}`}</Text>
          <Text>{`Wind Speed: ${weatherDetails.wind_speed}`}</Text>
          <Text>{`Precip: ${weatherDetails.precip}`}</Text>
          <Text>Weather Icons:</Text>
          {weatherDetails.weather_icons.map((icon, index) => (
            <Image
              style={Styles.weatherIcon}
              key={index}
              source={{uri: icon}}
            />
          ))}
        </View>
      )}
      {countries &&
        countries.map((country) => (
          <View
            key={country.numericCode}
            style={Styles.countryDetailsContainer}>
            <Text>{`Country: ${country.name}`}</Text>
            <Text>{`Capital: ${country.capital}`}</Text>
            <Text>{`Population: ${country.population}`}</Text>
            <Text>{`Lat/Lng: ${country.latlng.join(' / ')}`}</Text>
            <SvgUri
              style={Styles.countryFlag}
              width="50"
              height="50"
              uri={country.flag}
            />
            <Button
              onPress={() => getWeatherHandler(country.capital)}
              title="Capital Weather"
            />
          </View>
        ))}
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  weatherDetailsContainer: {
    marginVertical: 15,
  },
  weatherDetailsHeading: {
    fontSize: 18,
    marginBottom: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  countryDetailsContainer: {
    width: '100%',
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
  },
  countryFlag: {
    marginVertical: 10,
  },
});
