import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {FAB, Provider, Portal} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MOCK_TASKS from '../../api/db.json';

import TaskList from '../../components/TaskList';
import FilterModal from '../../components/FilterModal';
import SearchBar from '../../components/SearchBar';
import {useTheme} from '../../context/ThemeContext';

const App = () => {
  const {isDarkMode} = useTheme();
  const [tasks, setTasks] = useState(MOCK_TASKS.MOCK_TASKS);
  const [filters, setFilters] = useState({
    status: null,
    priority: null,
    dueDate: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  console.log("tasks",tasks)

  const sendData = async () => {
    try {
      let sendTask = JSON.stringify(tasks)
      AsyncStorage.setItem('taskData', sendTask);
    } catch (error) {
      console.error("AsyncStorage error: " + error.message);
    }
  }

  const callTasks = async () => { //is not getting called
    try {
      const response = await axios.get(`http://10.0.2.2:3000/MOCK_TASKS`);

      const newTasks = response.data;
      setTasks(newTasks);
      console.log('Response1', JSON.stringify(newTasks));

      await AsyncStorage.setItem('taskData', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    //callTasks(); //Uncomment this to call the API that is getting hosted on local server, otherwise we are directly fetching the data
    //sendData();
  }, []);  
  

  const resetFilters = () =>
    setFilters({status: null, priority: null, dueDate: null});

  const filteredTasks = tasks.filter(task => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.dueDate || task.dueDate === filters.dueDate) &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <Provider>
      <SafeAreaView
        style={[styles.container,isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <TaskList
          tasks={filteredTasks}
          onDelete={() => {}}
          onComplete={() => {}}
        />
        <Portal>
          <FilterModal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
          />
        </Portal>
        <FAB
          style={styles.fab}
          // icon="filter"
          label='Filter'
          onPress={() => setModalVisible(true)}
        />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  fab: {position: 'absolute', bottom: 20, right: 20},
  lightContainer: {backgroundColor: '#fff'},
  darkContainer: {backgroundColor: '#121212'},
});

export default App;
