<template>
  <div class="container">
    <nav>
      <div id="nav">
        <router-link to="/">Chatbot</router-link>
        <router-link to="/projekter">Projekter</router-link>
        <router-link to="/about">Medarbejderdag</router-link>
      </div>
    </nav>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
.container {
  width: 90vw;
  /* height: 90vh; */
  font-family: "Roboto", sans-serif;
  margin-bottom: 5rem;
}
</style>
