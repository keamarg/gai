// dropdown where you can select different versions of ChatGpt

<template>
  <!-- <label for="option">{{ label }}</label> -->
  <select v-model="selectedOption" @change="handleChange">
    <option v-for="option in options" :value="option" :key="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: this.selected,
    };
  },
  methods: {
    handleChange() {
      // Emit an event with the selected option
      this.$emit("option-selected", this.selectedOption);
    },
  },
};
</script>
<style scoped>
select {
  border: none;
  border-radius: 1rem;
  background-color: #1877f2;
  color: white;
  display: flex;
  height: 2rem;
  padding-left: 1rem;
}
</style>
