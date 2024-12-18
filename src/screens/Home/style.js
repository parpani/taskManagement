import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'green',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DDD',
  },
  actionText: {
    color: '#fff',
    padding: 15,
    fontWeight: 'bold',
  },
  leftAction: {
    backgroundColor: 'red',
  },
  rightAction: {
    backgroundColor: 'green',
  },
});

export default styles;
