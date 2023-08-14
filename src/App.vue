<template>
  <div class="container">
    <nav>
      <div id="nav">
        <router-link to="/">
          <img src="@/assets/img/KEA_logo_DK_Web_gai.jpg" width="60" />
        </router-link>
        <router-link to="/network">Survey</router-link>
        <router-link to="/chatgpt">Prøv GPT4</router-link>
        <router-link to="/liveblog">Liveblog</router-link>
      </div>
    </nav>
    <!-- <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div> -->
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
