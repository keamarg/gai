// store/user.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: localStorage.getItem("username") || "",
    keaId: localStorage.getItem("keaId") || "",
    showModal: false,
  }),
  actions: {
    setUsername(newUsername) {
      this.username = newUsername;
      localStorage.setItem("username", newUsername);
    },
    setKeaId(newKeaId) {
      this.keaId = newKeaId;
      localStorage.setItem("keaId", newKeaId);
    },
    setKeamail(newKeamail) {
      this.keamail = newKeamail;
      localStorage.setItem("keamail", newKeamail);
    },
    setShowModal(newShowModal) {
      this.showModal = newShowModal;
    },
  },
});
