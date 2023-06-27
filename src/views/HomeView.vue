<template>
  <div class="home">
    <!-- <ChatLottie width="90vw" height="90vw" /> -->
    <ChatGpt :selectedVersion="selectedVersion" />
    <!-- <h1>Velkommen til G-AI på KEA</h1> -->
    <!-- <GptSelector @version-selected="handleVersionSelected" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import ChatLottie from "@/components/ChatLottie.vue";
import ChatGpt from "@/components/ChatGpt.vue";
// import GptSelector from "@/components/GptSelector.vue";

export default {
  name: "HomeView",
  components: {
    // ChatLottie,
    ChatGpt,
    // GptSelector,
  },
  data() {
    return {
      selectedVersion: "gpt-35-turbo",
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
  /* align-items: center; */
  justify-content: center;
  height: 70vh;
}

@media (min-width: 600px) {
  /* .home {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    height: auto;
  } */
  ChatLottie {
    width: 20rem;
    height: 20rem;
  }
  /* chatGpt {
    padding: 2rem;
  } */
}
</style>
