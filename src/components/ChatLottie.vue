// https://blog.logrocket.com/creating-animated-logos-lottie-vue-3/

<template>
  <main>
    <div class="wrapper">
      <Vue3Lottie :animationData="playJSON" :height="height" :width="width" />
    </div>
  </main>
</template>

<script>
import playJSON from "../assets/lotties/chatbot-animation.json";

export default {
  props: {
    width: String,
    height: String,
    margin: String,
  },
  data() {
    return {
      playJSON,
    };
  },
};
</script>

<style scoped>
.lottie-animation-container {
  margin: v-bind(margin);
}
</style>
