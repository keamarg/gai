<template>
  <div class="medarbejderdag">
    <h1>Live blog fra medarbejderdagen</h1>
    <Livepost @update:show="showModal = $event" />
  </div>
  <div>
    <LoginModal :show="showModal" @update:show="showModal = $event">
    </LoginModal>
  </div>
</template>
<script>
// @ is an alias to /src
// import ChatLottie from "@/components/ChatLottie.vue";
import Livepost from "@/components/LivePost.vue";
import LoginModal from "@/components/LoginModal.vue";

export default {
  name: "AboutView",
  components: {
    Livepost,
    LoginModal,
  },
  data() {
    return {
      options: ["gpt-35-turbo", "gpt-3.5-turbo-16k", "gpt-4.0"],
      selected: null, // Initialize with null
      showModal: false,
    };
  },
  computed: {},
  methods: {
    handleOptionSelected(selected) {
      this.selected = selected;
    },
  },
  created() {
    this.selected = this.options[0]; // Set selected option after options are available
    localStorage.getItem("username") || localStorage.getItem("keaId")
      ? true
      : (this.showModal = true);
  },
};
</script>
