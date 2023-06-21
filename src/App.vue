<template>
  <nav>
    <div id="nav">
      <router-link to="/">Chatbot</router-link>
      <router-link to="/projekter">Projekter</router-link>
      <router-link to="/about">Medarbejderdag</router-link>
    </div>
  </nav>
  <div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style></style>
