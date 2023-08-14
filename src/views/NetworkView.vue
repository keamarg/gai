<template>
  <NetworkModal :show="showModal" @update:show="handleModalUpdate" />
</template>

<script>
import NetworkModal from "@/components/NetworkModal.vue";

export default {
  name: "HomeView",
  props: {},
  data() {
    return {
      showModal: true,
    };
  },
  computed: {},
  methods: {
    handleModalUpdate(newValue) {
      if (!newValue) {
        console.log("pushing");
        // Modal has been closed
        this.$router.push("/"); // Change this to the route you want to navigate to
      }
    },
  },
  mounted() {},
  updated() {},
  created() {},
  components: { NetworkModal },
};
</script>

<style scoped></style>
