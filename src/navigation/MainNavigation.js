import React, {useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Routes} from './Routes';

import Home from '../screens/Home/Home';
import Dashboard from '../screens/Dashboard/Dashboard';
import {ThemeProvider} from '../context/ThemeContext';
import { TaskProvider } from '../context/TaskContext';
import DrawerContent from '../components/DrawerContent';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
//const navigation = useNavigation();

const MainNavigation = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            initialRouteName={Home}
            screenOptions={{
              drawerStyle: {
                backgroundColor: '#2F4A99',
                width: '75%',
              },
            }}
          >
            <Drawer.Screen 
              name={Routes.Home} 
              component={Home} 
              options={({ route }) => ({
                headerShown: true,
                title: "Task Manager",
                headerTitleAlign: 'center',
                headerMode: 'float',
                headerStyle: {
                  backgroundColor: '#2F4A99',
                },
                headerTintColor: '#fff',
              })} />
              <Drawer.Screen 
                name={Routes.Dashboard} 
                component={Dashboard} 
                options={({ route }) => ({
                  headerShown: false,
                })}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default MainNavigation;
