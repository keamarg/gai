// dropdown where you can select different versions of ChatGpt

<template>
  <div>
    <label for="version">Select ChatGPT Version:</label>
    <select v-model="selectedVersion" @change="handleChange">
      <option v-for="version in versions" :value="version" :key="version">
        {{
          version === "gpt-4.0" || version === "gpt-3.5-turbo-16k"
            ? version + " (not available)"
            : version
        }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedVersion: "gpt-35-turbo",
      versions: ["gpt-35-turbo", "gpt-3.5-turbo-16k", "gpt-4.0"], // Array of available ChatGPT versions
    };
  },
  methods: {
    handleChange() {
      // Emit an event with the selected version
      this.$emit("version-selected", this.selectedVersion);
    },
  },
};
</script>
