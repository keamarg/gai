<template>
  <div class="modal" v-if="show">
    <!-- <div class="modal-overlay" @click="closeModal"></div> -->
    <div class="modal-content">
      <h2>Generativ AI på KEA</h2>
      <p>
        Vi er i "forskning karriere og relationer" i gang med at indsamle viden
        om hvilke resurser vi har på KEA indenfor Generativ AI. Desuden vil vi
        meget gerne skabe et netværk af interesserede, så hvis du enten lægger
        inde med viden og kompetencer indenfor feltet, eller blot kunne tænke
        dig at vide mere, så udfyld venligst nedenstående formular.
        Efterfølgende er der mulighed for en kort snak med en chatbot, der vil
        spørge uddybende ind til dine svar.
      </p>
      <form @submit.prevent="saveAndClose">
        <div class="form-group">
          <!-- <label for="username" class="label">KEA mail</label> -->
          <input
            type="text"
            id="email"
            v-model="email"
            class="input-field"
            pattern="[a-z0-9._%+-]+@kea\.dk"
            placeholder="Indtast din KEA mail"
          />
          <p v-if="email && !isValidEmail(email)" class="error-message">
            Indtast en gyldig KEA mail
          </p>
        </div>
        <div class="radiobuttons">
          <p><b>Hvordan vurderer du din egen viden om generativ AI?:</b></p>
          <input type="radio" id="Ekspert" name="viden" value="Ekspert" />
          <label for="html">Ekspert</label><br />
          <input type="radio" id="Bruger" name="viden" value="Bruger" />
          <label for="Bruger">Bruger</label><br />
          <input type="radio" id="Nybegynder" name="viden" value="Nybegynder" />
          <label for="Nybegynder">Nybegynder</label>
        </div>
        <div class="radiobuttons">
          <p><b>Er du interesseret i et netværk om AI på KEA?:</b></p>
          <input type="radio" id="deltage" name="deltagelse" value="deltage" />
          <label for="html">Vil gerne deltage</label><br />
          <input
            type="radio"
            id="informeres"
            name="deltagelse"
            value="informeres"
          />
          <label for="informeres">Vil gerne informeres</label><br />
          <input type="radio" id="nej" name="deltagelse" value="nej" />
          <label for="nej">ikke interesseret</label>
        </div>
        <div class="form-group">
          <button type="submit" class="askButton">Save and Close</button>
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
      keaId: "",
      email: "",
    };
  },
  computed: {},
  methods: {
    isValidEmail(email) {
      const emailPattern = /[a-z0-9._%+-]+@kea\.dk/;
      console.log(emailPattern.test(email));
      return emailPattern.test(email);
    },
    closeModal() {
      this.$emit("update:show", false);
    },
    saveAndClose() {
      if (this.isValidEmail(this.email)) {
        console.log("validation fulfilled");
        useUserStore().setKeamail(this.email);
        this.closeModal();
      } else {
        console.log("validation failed");
      }
    },
  },
};
</script>

<style scoped>
.radiobuttons {
  margin-bottom: 1rem;
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
}
.error-message {
  color: red;
}
</style>