<template>
  <div class="medarbejderdag">
    <h1>blog og billeder fra dagen</h1>
    <!-- <button @click="getData('json')" class="askButton pt-2">
      Hent data (json)
    </button>
    <button @click="getData('json')" class="askButton pt-2">
      Hent data (xlsx)
    </button>
    <button @click="newConversation()" class="askButton pt-2">
      Ny samtale
    </button> -->
    <Livepost />
  </div>
</template>
<script>
// @ is an alias to /src
// import ChatLottie from "@/components/ChatLottie.vue";
import Livepost from "@/components/LivePost.vue";

export default {
  name: "AboutView",
  components: {
    Livepost,
  },
  data() {
    return {
      options: ["gpt-35-turbo", "gpt-3.5-turbo-16k", "gpt-4.0"],
      selected: null, // Initialize with null
    };
  },
  methods: {
    handleOptionSelected(selected) {
      this.selected = selected;
    },
  },
  created() {
    this.selected = this.options[0]; // Set selected option after options are available
  },
};
</script>
