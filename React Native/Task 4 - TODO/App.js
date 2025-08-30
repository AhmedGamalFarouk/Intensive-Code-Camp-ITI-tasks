import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const completedTasksCount = todos.filter(todo => todo.completed).length;
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoKey, setCurrentTodoKey] = useState(null);

  const handleAddTask = () => {
    if (task.trim().length === 0) {
      Alert.alert('Invalid Task', 'Task cannot be empty.', [{ text: 'OK' }]);
      return;
    }
    if (task.trim().length < 3) {
      Alert.alert('Invalid Task', 'Task must be at least 3 characters long.', [{ text: 'OK' }]);
      return;
    }

    if (isEditing) {
      setTodos(currentTodos =>
        currentTodos.map(todo =>
          todo.key === currentTodoKey ? { ...todo, value: task } : todo
        )
      );
      setIsEditing(false);
      setCurrentTodoKey(null);
    } else {
      setTodos(currentTodos => [...currentTodos, { key: Math.random().toString(), value: task, completed: false }]);
    }
    setTask('');
  };

  const handleToggleComplete = (key) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.key === key ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTask = (key, value) => {
    setIsEditing(true);
    setCurrentTodoKey(key);
    setTask(value);
  };

  const handleDeleteTask = (key) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.key !== key));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a new todo"
          style={styles.input}
          onChangeText={setTask}
          value={task}
        />
        <Button title={isEditing ? "Update Task" : "Add Task"} onPress={handleAddTask} />
      </View>
      <Text style={styles.completedTasksText}>Completed Tasks: {completedTasksCount}</Text>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={[styles.listItem, item.completed && styles.completedListItem]}>
            <TouchableOpacity onPress={() => handleToggleComplete(item.key)} style={styles.checkboxContainer}>
              <View style={[styles.checkbox, item.completed && styles.checkedCheckbox]}>
                {item.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <Text style={[styles.taskText, item.completed && styles.completedText]}>{item.value}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => handleEditTask(item.key, item.value)} />
              <Button title="Delete" onPress={() => handleDeleteTask(item.key)} color="red" />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    width: '70%',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  completedListItem: {
    backgroundColor: '#d4edda', // Light green for completed tasks
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#555',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: '#28a745', // Green background when checked
    borderColor: '#28a745',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1, // Allow text to take available space
  },
});
