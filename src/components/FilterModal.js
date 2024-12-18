import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Modal, Button} from 'react-native-paper';

const FilterModal = ({
  visible,
  onDismiss,
  filters,
  setFilters,
  resetFilters,
}) => {
  const OPTIONS = {
    status: ['Completed', 'Pending', 'In Progress'],
    priority: ['High', 'Medium', 'Low'],
    dueDate: ['Today', 'This Week', 'Overdue'],
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modal}>
      <Text style={styles.title}>Filter Tasks</Text>

      {Object.keys(OPTIONS).map(key => (
        <View key={key}>
          <Text style={styles.subtitle}>{key.toUpperCase()}</Text>
          <View style={styles.options}>
            {OPTIONS[key].map(option => (
              <Button
                mode={filters[key] === option ? 'contained' : 'outlined'}
                onPress={() => handleFilterChange(key, option)}
                key={option}
                style={styles.button}>
                {option}
              </Button>
            ))}
          </View>
        </View>
      ))}

      <Button
        mode="contained"
        onPress={resetFilters}
        style={styles.resetButton}>
        Reset Filters
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {backgroundColor: 'white', padding: 20, borderRadius: 10},
  title: {fontSize: 20, fontWeight: 'bold', color:'#000'},
  subtitle: {fontSize: 16, fontWeight: '600', marginVertical: 5, color:'#111'},
  options: {flexDirection: 'row', flexWrap: 'wrap'},
  button: {margin: 5},
  resetButton: {marginTop: 15},
});

export default FilterModal;
