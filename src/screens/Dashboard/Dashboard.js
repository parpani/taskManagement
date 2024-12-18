import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { useTaskContext } from '../../context/TaskContext';

const Dashboard = ({ navigation }) => {
  const { tasks, addTask } = useTaskContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', priority: 'Low' });

  // Metrics
  const today = new Date().toISOString().split('T')[0];
  const tasksCompletedToday = tasks.filter(
    (task) => task.status === 'Completed' && task.dueDate === today
  ).length;

  const upcomingDeadlines = [...tasks]
    .filter((task) => new Date(task.dueDate) > new Date())
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const overdueCount = tasks.filter((task) => new Date(task.dueDate) < new Date()).length;

  const createTask = () => {
    addTask({ ...newTask, id: Date.now(), status: 'Pending' });
    setModalVisible(false);
    setNewTask({ title: '', dueDate: '', priority: 'Low' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      <View style={styles.metricsContainer}>
        <Text style={styles.metric}>Tasks Completed Today: {tasksCompletedToday}</Text>
        <Text style={styles.metric}>Overdue Tasks: {overdueCount}</Text>
        <Text style={styles.metric}>Upcoming Deadlines:</Text>
        <FlatList
          data={upcomingDeadlines}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.deadlineItem}>
              {item.title} - {item.dueDate}
            </Text>
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.createTaskButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createTaskText}>+ Create Task</Text>
      </TouchableOpacity>

      <Button title="Go to Tasks" onPress={() => navigation.navigate('Home')} />

      {/* Create Task Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Create New Task</Text>
            <TextInput
              placeholder="Task Title"
              placeholderTextColor='#111'
              style={styles.input}
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            />
            <TextInput
              placeholder="Due Date (YYYY-MM-DD)"
              placeholderTextColor='#111'
              style={styles.input}
              value={newTask.dueDate}
              onChangeText={(text) => setNewTask({ ...newTask, dueDate: text })}
            />
            <Button title="Add Task" onPress={createTask} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  metricsContainer: { marginBottom: 20 },
  metric: { fontSize: 16, marginBottom: 10 },
  deadlineItem: { fontSize: 14, color: 'gray' },
  createTaskButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  createTaskText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color:'#000' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Dashboard;
