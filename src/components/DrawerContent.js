// DrawerContent.js
import React from 'react';
import {View, Text, Switch, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {useTheme} from '../context/ThemeContext';

const DrawerContent = ({navigation}) => {
  const {isDarkMode, toggleTheme} = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.text}>Dashboard</Text>
      </TouchableOpacity>

      {/* <Button title="Logout" onPress={onLogout} color="red" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 20, fontWeight: 'bold'},
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  row:{flexDirection:'row', justifyContent:'space-between'},
  text: {fontSize: 16, color:'#fff'},
});

export default DrawerContent;
