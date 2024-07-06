<template>
  <div class="signin-form">
    <h2>Signin</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" v-model="password" required />
      </div>
      <button type="submit">Signin</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const email = ref('');
const password = ref('');
const router = useRouter();
const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:3000/signin', {
      email: email.value,
      password: password.value
    });
    if (response.data.access_token) {
      // Store token in localStorage
      localStorage.setItem('token', response.data.access_token);
      
      alert("Signin successful!");
      router.push('/tasks'); // Redirect to tasks page after successful signin
    } else {
      alert("Invalid response from server");
    }
    router.push('/tasks');
  } catch (error) {
  if (error.response && error.response.data && error.response.data.message) {
      alert("Error during signup: " + error.response.data.message);
    } else {
      alert("An unexpected error occurred during signup.");
    }
  }
};
</script>

<style scoped>
.signin-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
form div {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #218838;
}
</style>
