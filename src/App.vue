<template>
  <div class="container">
    <nav>
      <div id="nav">
        <router-link to="/">
          <img src="@/assets/img/KEA_logo_DK_Web_gai.jpg" width="60" />
        </router-link>
        <router-link to="/nyheder">Nyheder</router-link>
        <router-link to="/events">Events</router-link>
        <router-link to="/network">Tilmeld netværk</router-link>
        <!-- <router-link to="/liveblog">Q&A blog</router-link> -->
        <!-- <router-link
          :to="{
            name: 'DynamicNetwork',
            params: { propValue: 'network' },
          }"
          >Netværk</router-link
        > -->

        <router-link to="/chatgpt">Prøv GPT4</router-link>
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
#nav {
  padding: 0.5rem;
}
</style>
