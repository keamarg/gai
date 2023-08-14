<template>
  <div class="home">
    <!-- <ChatLottie width="90vw" height="90vw" /> -->
    <ChatGptNetwork :model="selected" />
    <!-- <h1>Velkommen til G-AI på KEA</h1> -->
    <!-- <GptSelector
      @option-selected="handleOptionSelected"
      :selected="selected"
      :options="options"
      :label="'Select ChatGPT Version: '"
    /> -->
  </div>
  <div>
    <!-- <button @click="showModal = true">Open Modal</button> -->
    <MessageModal :show="showModal" @update:show="showModal = $event">
    </MessageModal>
  </div>
</template>

<script>
// @ is an alias to /src
// import ChatLottie from "@/components/ChatLottie.vue";
import ChatGptNetwork from "@/components/ChatGptNetwork.vue";
import MessageModal from "@/components/MessageModal.vue";
// import GptSelector from "@/components/GptSelector.vue";

export default {
  name: "SurveyView",
  components: {
    // ChatLottie,
    ChatGptNetwork,
    MessageModal,
    // GptSelector,
  },
  data() {
    return {
      options: ["gpt-4", "gpt-35-turbo"],
      selected: null, // Initialize with null
      showModal: true,
    };
  },
  methods: {
    handleOptionSelected(selected) {
      this.selected = selected;
    },
  },
  created() {
    this.selected = this.options[0]; // Set selected option after options are available
    // localStorage.getItem("keamail") ? true : (this.showModal = true);
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
  /* ChatLottie {
    width: 20rem;
    height: 20rem;
  } */
  /* chatGpt {
    padding: 2rem;
  } */
}
</style>
