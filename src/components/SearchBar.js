import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const SearchBar = ({value, onChange}) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search tasks..."
      placeholderTextColor={'#000'}
      value={value}
      onChangeText={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {padding: 10},
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
});

export default SearchBar;
