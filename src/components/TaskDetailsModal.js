import React, {useState} from 'react';
import {Modal, View, Text, StyleSheet, Button} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const PRIORITY_OPTIONS = [
  {label: 'High', value: 'High'},
  {label: 'Medium', value: 'Medium'},
  {label: 'Low', value: 'Low'},
];

const STATUS_OPTIONS = [
  {label: 'Pending', value: 'Pending'},
  {label: 'In Progress', value: 'In Progress'},
  {label: 'Completed', value: 'Completed'},
];

const TaskDetailsModal = ({visible, onClose, task, onUpdate}) => {
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    onUpdate(task.id, {priority, status});
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Task Details</Text>
          <Text>Task Name: {task.title}</Text>
          <Text>Description: {task.description}</Text>
          <Text>Due Date: {task.dueDate}</Text>

          <Text style={styles.label}>Priority</Text>
          <Dropdown
            data={PRIORITY_OPTIONS}
            value={priority}
            onChange={item => setPriority(item.value)}
            style={styles.dropdown}
            placeholder="Select Priority"
          />

          <Text style={styles.label}>Status</Text>
          <Dropdown
            data={STATUS_OPTIONS}
            value={status}
            onChange={item => setStatus(item.value)}
            style={styles.dropdown}
            placeholder="Select Status"
          />

          <View style={styles.buttonRow}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Close" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  title: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  label: {marginTop: 10, fontWeight: '600'},
  dropdown: {marginVertical: 5},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
});

export default TaskDetailsModal;
