<template>
  <div class="modal" v-if="show">
    <!-- <div class="modal-overlay" @click="closeModal"></div> -->
    <div class="modal-content">
      <!-- <div class="close-button" @click="closeModal">&times;</div> -->
      <h2>Survey</h2>
      <p>
        Velkommen til SurveyChatten med SurveyBotten G-AI-A! G-AI-A er en
        Generativ AI chatbot, der indsamler viden om kompetencerne på KEA.
        Igennem en 3-5 minutter lang chat vil G-AI-A spørge ind til dine
        erfaringer, betragtninger og ideer omkring Generativ AI på KEA. Hvis du
        ikke oplyser dit navn, er dine data er anonyme. Data bruges kun af KEA
        og til at kvalificere, hvilke aktiviteter, der er relevante om G-AI på
        KEA. <br /><br />Fortæl G-AI-A hvis du har et emne du gerne vil chatte
        om, som du ikke er blevet spurgt til.
      </p>
      <div class="buttonContainer">
        <button type="button" @click="closeModal" class="askButton">
          Jeg er indforstået med at samtalen gemmes
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
