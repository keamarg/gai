<template>
  <div class="modal" v-if="show">
    <!-- <div class="modal-overlay" @click="closeModal"></div> -->
    <div class="modal-content">
      <!-- <div class="close-button" @click="closeModal">&times;</div> -->
      <h2>Prøv ChatGPT4</h2>
      <p>
        Velkommen til KEA’s egen GPT4-chatbot! <br /><br />Her kan du prøve at
        chatte med ChatGPT4 uden at skulle oprette en bruger eller dele data med
        OpenAI. I venstre hjørne kan du vælge om du vil chatte med den generelle
        GPT4-chatbot eller om du vil chatte med en GPT4 version der er trænet
        til at svare på spørgsmål om Generativ AI. Data fra samtalerne gemmes
        ikke til træning. <br /><br />
      </p>
      <div class="buttonContainer">
        <button type="button" @click="closeModal" class="askButton">
          Prøv ChatGPT4
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    closeModal() {
      console.log("emit");
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped>
.buttonContainer {
  display: flex;
  justify-content: center;
  padding: 8px; /* Adjust the margin as needed */
  align-items: center;
}
.close-button {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  font-size: 1.5rem;
  cursor: pointer;
}
.modal {
  position: fixed;
  top: 2%; /* Adjust the top value to move the modal further from the top */
  left: 0;
  height: 100%;
  width: 100%; /* Set the modal's width to 100% of the viewport width */
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: rgba(0, 0, 0, 0.5); */
}

/* Add a pseudo-element for the overlay */
.modal::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* Adjust the alpha value for the desired darkness */
  z-index: -1; /* Place the overlay behind the modal content */
}
.modal-content {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 80%; /* Set a maximum width for the modal content */
  max-height: 80vh; /* Set a maximum height for the modal content */
  overflow-y: auto; /* Add vertical scroll if the content exceeds the max height */
}

/* Apply reduced width to modal content when window width is over 800px */
@media (min-width: 800px) {
  .modal-content {
    max-width: 60%; /* Adjust the reduced width as needed */
  }
}
@media (min-width: 1200px) {
  .modal-content {
    max-width: 30%; /* Adjust the reduced width as needed */
  }
}
.askButton {
  background-color: #1877f2;
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 1.5rem;
  transition: background-color 0.3s ease-in-out;
}

/* Hover styles for both classes */
.askButton:hover {
  background-color: #145cb3;
}
.form-group {
  margin-bottom: 10px;
}

.label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.error-message {
  color: red;
}
</style>
