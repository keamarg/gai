<template>
  <div class="home">
    <ChatLottie width="20rem" height="20rem" />
    <ChatGpt :selectedVersion="selectedVersion" />
    <!-- <h1>Velkommen til G-AI på KEA</h1> -->
    <GptSelector @version-selected="handleVersionSelected" />
  </div>
</template>

<script>
// @ is an alias to /src
import ChatLottie from "@/components/ChatLottie.vue";
import ChatGpt from "@/components/ChatGpt.vue";
import GptSelector from "@/components/GptSelector.vue";

export default {
  name: "HomeView",
  components: {
    ChatLottie,
    ChatGpt,
    GptSelector,
  },
  data() {
    return {
      selectedVersion: "gpt-3.5-turbo",
    };
  },
  methods: {
    handleVersionSelected(version) {
      // Do something with the selected version
      this.selectedVersion = version;
      // console.log("Selected version:", version);
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100vh;
}
</style>
