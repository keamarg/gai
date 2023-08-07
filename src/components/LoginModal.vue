<template>
  <div class="modal" v-if="show">
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-content">
      <h2>Skriv dit fornavn og dit KEA ID for at deltage i live bloggen</h2>
      <form @submit.prevent="saveAndClose">
        <div class="form-group">
          <label for="name" class="label">Navn</label>
          <input type="text" id="name" v-model="name" class="input-field" />
          <p v-if="!name && showNameError" class="error-message">Udfyld navn</p>
        </div>
        <div class="form-group">
          <label for="keaId" class="label">KEA-ID</label>
          <input type="text" id="keaId" v-model="keaId" class="input-field" />
          <p v-if="!keaId && showKeaIdError" class="error-message">
            Udfyld KEA-ID
          </p>
        </div>
        <div class="form-group">
          <button type="submit" class="askButton">Save and Close</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
      name: "",
      keaId: "",
      showNameError: false,
      showKeaIdError: false,
    };
  },
  computed: {
    validationFulfilled() {
      return this.name && this.keaId;
    },
  },
  methods: {
    closeModal() {
      this.$emit("update:show", false);
    },
    saveAndClose() {
      console.log("save and close");
      if (this.validationFulfilled) {
        console.log("validation fulfilled");
        localStorage.setItem("name", this.name);
        localStorage.setItem("keaId", this.keaId);
        this.closeModal();
      } else {
        console.log("validation failed");
        this.showNameError = this.name === "";
        this.showKeaIdError = this.keaId === "";
      }
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

/* .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
} */

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
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
}
.error-message {
  color: red;
}
</style>
