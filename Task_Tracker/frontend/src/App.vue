<template>
  <div id="app">
    <nav>
      <router-link to="/signup" class="nav-link">Signup</router-link>
      <router-link to="/signin" class="nav-link">Signin</router-link>
    </nav>
    <router-view/>
  </div>
</template>


<style scoped>
nav {
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
}
.nav-link {
  margin-right: 10px;
  text-decoration: none;
  color:white;
  transition: all 0.3s ease;
  background-color: #28a745;
  padding:5px;
  
}
.nav-link:hover {
  text-decoration: none;
  color: white;
  background-color: #218838;
}
</style>
