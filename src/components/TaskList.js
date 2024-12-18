import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useTheme} from '../context/ThemeContext';

const TaskList = ({tasks, onDelete, onComplete}) => {
  const {isDarkMode} = useTheme();

  const renderItem = ({item}) => (
    <View style={[styles.taskItem,isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title,isDarkMode ? styles.lightColor : styles.darkColor]}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.info}>
        Priority: {item.priority} | Due: {item.dueDate} | Status: {item.status}
      </Text>
    </View>
  );

  const renderHiddenItem = data => (
    <View style={styles.rowBack}>
      <Text
        style={[styles.actionText, styles.delete]}
        onPress={() => onDelete(data.item.id)}>
        Delete
      </Text>
      <Text
        style={[styles.actionText, styles.complete]}
        onPress={() => onComplete(data.item.id)}>
        Complete
      </Text>
    </View>
  );

  return (
    <SwipeListView
      data={tasks}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-75}
      leftOpenValue={75}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    elevation: 2,
  },
  title: {fontSize: 16, fontWeight: 'bold'},
  info: {fontSize: 12, color: 'gray'},
  rowBack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    flex: 1,
    marginVertical: 5,
  },
  actionText: {color: '#fff', padding: 15, fontWeight: 'bold'},
  delete: {backgroundColor: 'red'},
  complete: {backgroundColor: 'green'},
  lightContainer: {backgroundColor: '#fff'},
  darkContainer: {backgroundColor: '#121212'},
  lightColor:{color:'#fff'},
  darkColor:{color:'#121212'}
});

export default TaskList;
