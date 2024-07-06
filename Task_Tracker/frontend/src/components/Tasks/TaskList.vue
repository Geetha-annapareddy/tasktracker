<template>
  <div class="task-list">
    <h2>My Tasks</h2>
    <div class="add-task">
      <input v-model="newTask" placeholder="Add a task" @keyup.enter="addTask" class="task-input" />
      <button @click="addTask" :disabled="newTask.trim() === '' || addingTask" class="add-button">Add</button>
    </div>
    <ul class="tasks">
      <li v-for="task in incompleteTasks" :key="task._id" class="task">
        <!-- Checkbox rendered only for incomplete tasks -->
        <input v-if="!task.status" type="checkbox" :checked="task.status" @change="toggleTaskCompletion(task)" :disabled="updatingTask" />
        <span class="task-title" :class="{ completed: task.status }">{{ truncateTaskTitle(task.title) }}</span>
        <span v-if="isLongTask(task.title)" class="read-more" @click="toggleShowTask(task)">
          {{ task.showDetails ? 'Show Less' : 'Read More' }}
        </span>
        <span v-else class="read-more"></span>
      </li>
    </ul>
    <h3>Completed ({{ completedTasks.length }})</h3>
    <ul class="tasks completed-tasks">
      <li v-for="task in completedTasks" :key="task._id" class="task">
        <!-- No checkbox for completed tasks -->
        <span class="task-title" :class="{ completed: task.status }">{{ truncateTaskTitle(task.title) }}</span>
        <span v-if="isLongTask(task.title)" class="read-more" @click="toggleShowTask(task)">
          {{ task.showDetails ? 'Show Less' : 'Read More' }}
        </span>
        <span v-else class="read-more"></span>
      </li>
    </ul>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const tasks = ref([]);
const newTask = ref('');
const token = localStorage.getItem('token');

const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/tasks/getTasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    tasks.value = response.data.map(task => ({
      ...task,
      showDetails: false  // Add showDetails property for tracking expanded state
    }));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    error.value = 'Failed to fetch tasks. Please try again.';
  }
};

const addTask = async () => {
  if (newTask.value.trim() === '') return;
  addingTask.value = true;

  try {
    const response = await axios.post('http://localhost:3000/tasks/addTask', {
      title: newTask.value,
      status: false
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    tasks.value.push({ ...response.data, showDetails: false });
    newTask.value = '';
  } catch (error) {
    console.error('Error adding task:', error);
    error.value = 'Failed to add task. Please try again.';
  } finally {
    addingTask.value = false;
  }
};

const toggleTaskCompletion = async (task) => {
  updatingTask.value = true;

  try {
    const response = await axios.patch(`http://localhost:3000/tasks/tasks/${task._id}`, {
      status: !task.status
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    task.status = response.data.status;
  } catch (error) {
    console.error('Error toggling task completion:', error);
    error.value = 'Failed to update task status. Please try again.';
  } finally {
    updatingTask.value = false;
  }
};

const error = ref('');
const addingTask = ref(false);
const updatingTask = ref(false);

const completedTasks = computed(() => tasks.value.filter(task => task.status));
const incompleteTasks = computed(() => tasks.value.filter(task => !task.status));

// Function to truncate task title
const truncateTaskTitle = (title) => {
  const maxLength = 50; // Adjust as needed
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
};

// Function to check if task title is long
const isLongTask = (title) => {
  const maxLength = 50; // Adjust as needed
  return title.length > maxLength;
};

// Function to toggle showDetails for long tasks
const toggleShowTask = (task) => {
  task.showDetails = !task.showDetails;
};

onMounted(fetchTasks);
</script>

<style scoped>
.task-list {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
h2, h3 {
  margin: 0 0 10px 0;
  font-size: 1.2em;
}
.add-task {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.task-input {
  flex: 1; /* Take up remaining space */
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  min-width: 0; /* Ensure it can shrink */
}
.add-button {
  padding: 8px 12px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.add-button:hover {
  background-color: #218838;
}
.add-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
ul.tasks {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}
ul.tasks.completed-tasks {
  border-top: 1px solid #ccc;
  padding-top: 10px;
}
li.task {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.task-title {
  flex: 1; /* Take up remaining space */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.read-more {
  cursor: pointer;
  color: #28a745;
  margin-left: 10px;
}
.completed {
  text-decoration: line-through;
  color: #888;
}
.error {
  color: red;
  margin-top: 10px;
}

</style>
