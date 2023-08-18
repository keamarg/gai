<template>
  <div class="modal" v-if="show">
    <!-- <div class="modal-overlay" @click="closeModal"></div> -->
    <div class="modal-content">
      <div class="close-button" @click="closeModal">&times;</div>
      <h2>Deltag i live bloggen</h2>
      <form @submit.prevent="saveAndClose">
        <div class="form-group">
          <!-- <label for="username" class="label">Navn</label> -->
          <input
            type="text"
            id="username"
            v-model="username"
            class="input-field"
            placeholder="Fornavn"
          />
          <p v-if="!username && showNameError" class="error-message">
            Udfyld navn
          </p>
        </div>
        <!-- <div class="form-group">
          <input
            type="text"
            id="keaId"
            v-model="keaId"
            class="input-field"
            placeholder="KEA-ID"
          />
          <p v-if="!keaId && showKeaIdError" class="error-message">
            Udfyld KEA-ID
          </p>
        </div> -->
        <div class="form-group">
          <div class="buttonContainer">
            <button type="submit" class="askButton">Save and Close</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/store";
export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
      username: "",
      // keaId: "",
      showNameError: false,
      // showKeaIdError: false,
    };
  },
  computed: {
    validationFulfilled() {
      return this.username; //&& this.keaId;
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:show", false);
    },
    saveAndClose() {
      if (this.validationFulfilled) {
        // console.log("validation fulfilled");
        useUserStore().setUsername(this.username);
        //useUserStore().setKeaId(this.keaId);
        this.closeModal();
      } else {
        // console.log("validation failed");
        this.showNameError = this.username === "";
        //this.showKeaIdError = this.keaId === "";
      }
    },
  },
};
</script>

<style scoped>
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
.buttonContainer {
  display: flex;
  justify-content: center;
  padding: 8px; /* Adjust the margin as needed */
  align-items: center;
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
