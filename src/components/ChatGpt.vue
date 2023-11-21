<template>
  <!-- <div class="chatbox-container"> -->

  <div class="container">
    <div class="kealogo">
      <div class="center-logo">
        <ChatLottie width="5rem" height="5rem" margin="" />
      </div>
      <div class="dropdown-wrapper">
        <button @click.stop="showMenu = !showMenu" class="askButton">
          <i v-if="!showMenu" class="bi bi-list"></i>
          <i v-else class="bi bi-x-lg"></i>
        </button>
        <transition name="fade">
          <div
            v-bind:class="{ dropdown: true, show: showMenu }"
            v-show="showMenu"
          >
            <span
              v-if="
                localStorageData &&
                Array.isArray(localStorageData) &&
                localStorageData.length > 0
              "
            >
              <p
                @click="deleteLocalStorage"
                style="text-decoration: underline; color: red"
              >
                Slet alle
              </p>
              <p
                v-for="(item, index) in localStorageData"
                :key="index"
                @click="createSessionData(index)"
              >
                {{ getSessionDate(item) }}
              </p>
            </span>
            <span v-else><p>Ingen gemt</p></span>
          </div>
        </transition>
      </div>
    </div>
    <div class="messageBox mt-8" ref="messageBox">
      <span class="chatGptMessageContent chatGptMessageWrapper">{{
        introMessage[0].content
      }}</span>

      <template v-for="(message, index) in messages" :key="index">
        <div
          :class="
            message.role === 'user'
              ? 'userMessageWrapper'
              : 'chatGptMessageWrapper'
          "
        >
          <div
            :class="
              message.role === 'user'
                ? 'userMessageContent'
                : 'chatGptMessageContent'
            "
          >
            <!-- Version hvis man vil have lidt margen til overskriften (gråspurve med kanoner?)
               <template
              v-for="(part, partIndex) in splitContent(message.content)"
              :key="`part-${partIndex}`"
              ><span
                v-if="isCode(partIndex)"
                :class="{
                  code: isCode(partIndex),
                }"
              >
                <span class="programming-language"
                  >{{ part.split("\n")[0] }} </span
                ><span>{{ part.substring(part.indexOf("\n")) }}</span>
              </span>
              <span v-else>{{ part }}</span>
            </template> -->

            <template
              v-for="(part, partIndex) in splitContent(message.content)"
              :key="`part-${partIndex}`"
            >
              <span
                :class="{
                  code: isCode(partIndex),
                }"
                >{{ part }}</span
              >
            </template>
          </div>
        </div>
      </template>
      <ChatLottie v-if="loading" width="2rem" height="2rem" margin="1rem" />
    </div>
    <!-- <div class="inputContainer">
      <input
        v-model="userInput"
        type="text"
        class="messageInput"
        @keyup.enter="userMessage(userInput)"
        placeholder="Sig noget..."
      />
      <button
        @click="userMessage(userInput)"
        :class="{
          askButton: !loading && userInput,
          loadingButton: loading || !userInput,
        }"
      >
        Send
      </button>
    </div> -->
    <div class="inputContainer">
      <textarea
        v-model="userInput"
        class="messageInput"
        placeholder="Sig noget..."
      ></textarea>
      <button
        @click="userMessage(userInput)"
        :class="{
          askButton: !loading && userInput,
          loadingButton: loading || !userInput,
        }"
      >
        Send
      </button>
    </div>

    <div class="buttonContainer">
      <GptSelector
        @option-selected="handleOptionSelected"
        :options="options"
        :selected="selected"
        :label="label"
      />
      <div class="slidecontainer large-screen">
        <i style="font-size: 1.5rem" class="bi bi-thermometer-half"></i>
        <input
          type="range"
          min="0"
          max="200"
          v-model="temperature"
          :disabled="!sliderActive"
        />
        <p style="width: 1rem">{{ temperature / 100 }}</p>
      </div>
      <GptSelector
        @option-selected="handleGptOptionSelected"
        :options="gptOptions"
        :selected="model"
        :label="label"
      />

      <button
        @click="newConversation()"
        :class="{
          askButton: !loading,
          loadingButton: loading,
        }"
      >
        <i class="bi bi-arrow-clockwise"></i>
      </button>
    </div>
    <div class="slidecontainer small-screen">
      <i style="font-size: 1.5rem" class="bi bi-thermometer-half"></i>
      <input
        type="range"
        min="0"
        max="200"
        v-model="temperature"
        :disabled="!sliderActive"
      />
      <p style="width: 1rem">{{ temperature / 100 }}</p>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import systemMessages from "@/data/messages.json";
import ChatLottie from "./ChatLottie.vue";
import GptSelector from "./GptSelector.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "ChatGpt",
  components: { ChatLottie, GptSelector },
  props: {
    // model: {
    //   type: String,
    //   default: "gpt-3.5-turbo",
    // },
  },
  data() {
    return {
      localStorageData: [], //needed for the dropdown to keep it reactive
      sliderActive: true,
      sessionId: "",
      userInput: "",
      loading: false,
      showMenu: false,
      options: ["Generel", "Generativ AI", "Tutor"],
      gptOptions: ["gpt-4", "gpt-35-turbo"],
      selected: null, // Initialize with null
      model: null,
      temperature: 100,
      max_tokens: 4096,
      label: "",
      messages: [],
      standardMessages: systemMessages.standardMessages,
      gaiMessages: systemMessages.gaiMessages,
      tutorMessages: systemMessages.tutorMessages,
      introMessage: systemMessages.introMessage,
      apiUrl: process.env.VUE_APP_APIURL, //"https://gaichatbot.azurewebsites.net/database", //"http://127.0.0.1:5000/database" //"https://gaichatbot.azurewebsites.net/database"
      apiUrl_CHATDB: process.env.VUE_APP_APIURL_CHATDB,
    };
  },
  computed: {
    // getLocalStorage() {
    //   // console.log(JSON.parse(localStorage.getItem("conversations")));
    //   return JSON.parse(localStorage.getItem("conversations"));
    // },
    getMessages() {
      if (this.selected == "Generel") {
        return this.standardMessages;
      } else if (this.selected == "Generativ AI") {
        return this.gaiMessages;
      } else if (this.selected == "Tutor") {
        return this.tutorMessages;
      }
      return this.messages;
    },
  },
  methods: {
    getDateString() {
      let date = new Date();
      let dateString =
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear() +
        " " +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2);
      return dateString.toString();
    },
    updateLocalStorageData() {
      // console.log(JSON.parse(localStorage.getItem("conversations")));
      this.localStorageData = JSON.parse(localStorage.getItem("conversations"));
    },
    deleteLocalStorage() {
      localStorage.setItem("conversations", JSON.stringify([]));
      this.updateLocalStorageData();
    },
    getSessionDate(item) {
      return Object.keys(item)[0].split("_").pop();
    },
    createSessionData(index) {
      let conversations = this.localStorageData[index];
      for (let key in conversations) {
        if (Array.isArray(conversations[key])) {
          this.messages = [...conversations[key]];
          if (this.selected == "Generel") {
            this.standardMessages = [
              ...this.standardMessages,
              ...conversations[key],
            ];
          } else if (this.selected == "Generativ AI") {
            this.gaiMessages = [...this.gaiMessages, ...conversations[key]];
          } else if (this.selected == "Tutor") {
            this.tutorMessages = [...this.tutorMessages, ...conversations[key]];
          }
          break;
        }
      }
      // return this.messages;
    },
    splitContent(content) {
      return content.split("```");
    },
    isCode(index) {
      return index % 2 !== 0;
    },
    newConversation() {
      if (!this.loading) {
        this.updateLocalStorageData();
        this.messages = [];
        this.sliderActive = true;
        this.standardMessages = JSON.parse(
          JSON.stringify(systemMessages.standardMessages)
        );
        this.gaiMessages = JSON.parse(
          JSON.stringify(systemMessages.gaiMessages)
        );
        this.tutorMessages = JSON.parse(
          JSON.stringify(systemMessages.tutorMessages)
        );
        // this.sendMessage(this.message, 3);
        this.sessionId = uuidv4();
      }
    },
    async userMessage(message) {
      this.userInput = "";
      if (!this.loading && message) {
        this.getMessages.push({
          role: "user",
          content: message,
        });
        // generisk messages så few-shot og system beskeder ikke bliver vist i chat
        this.messages.push({
          role: "user",
          content: message,
        });
        // console.log(this.userInput);
        // if (this.selected == this.options[1]) {
        //   this.postData("user", message);
        // }

        await this.sendMessage(message, 3); // No retries here

        // Hent samtale-arrayet, eller opret et tomt array hvis det ikke eksisterer.
        let conversations =
          JSON.parse(localStorage.getItem("conversations")) || [];

        // Opret et objekt for denne samtale.
        let session = {};
        session["session_" + this.sessionId + "_" + this.getDateString()] =
          this.messages;

        // Tjek om samtalen allerede eksisterer i samtale-arrayet.
        let existingSessionIndex = conversations.findIndex((conversation) =>
          Object.keys(conversation)[0].includes("session_" + this.sessionId)
        );

        if (existingSessionIndex !== -1) {
          // Hvis samtalen eksisterer, opdater den.
          conversations[existingSessionIndex] = session;
        } else {
          // Hvis samtalen ikke eksisterer, tilføj den til samtale-arrayet.
          conversations.push(session);
        }

        // Gem samtale-arrayet tilbage i localStorage.
        localStorage.setItem("conversations", JSON.stringify(conversations));

        this.updateLocalStorageData();
      }
    },
    async sendMessage(message, maxRetries) {
      // console.log(this.apiUrl);
      // const apiUrl = process.env.VUE_APP_APIURL;
      this.sliderActive = false;
      while (maxRetries >= 0) {
        try {
          this.loading = true; // Show the loading animation
          const response = await fetch(this.apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify(
              this.selected == this.options[0]
                ? {
                    engine: this.model, //"gpt-35-turbo",
                    temperature: this.temperature / 100,
                    max_tokens: this.max_tokens,
                    top_p: 0.95,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stop: null,
                    messages: [
                      ...this.standardMessages,
                      message !== undefined && message !== ""
                        ? { role: "user", content: message }
                        : {
                            role: "user",
                            content:
                              "Giv en velkomst som om samtalen lige er startet",
                          }, //First question/message for the model to actually respond to
                    ],
                  }
                : this.selected == this.options[1]
                ? {
                    engine: this.model,
                    temperature: this.temperature / 100,
                    max_tokens: this.max_tokens,
                    top_p: 0.95,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stop: null,
                    messages: [
                      ...this.gaiMessages,

                      message !== undefined && message !== ""
                        ? { role: "user", content: message }
                        : {
                            role: "user",
                            content:
                              "Giv en velkomst som om samtalen lige er startet",
                          }, //First question/message for the model to actually respond to
                    ],
                  }
                : {
                    engine: this.model,
                    temperature: this.temperature / 100,
                    max_tokens: this.max_tokens,
                    top_p: 0.95,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stop: null,
                    messages: [
                      ...this.tutorMessages,

                      message !== undefined && message !== ""
                        ? { role: "user", content: message }
                        : {
                            role: "user",
                            content:
                              "Giv en velkomst som om samtalen lige er startet",
                          }, //First question/message for the model to actually respond to
                    ],
                  }
            ),
          });

          const data = await response.json();
          // console.log(data);

          const newMessage = data.choices[0].message.content;
          this.getMessages.push({
            role: "assistant",
            content: newMessage,
          });
          //generisk messages så few-shot og system beskeder ikke bliver vist i chat
          this.messages.push({
            role: "assistant",
            content: newMessage,
          });
          // if (this.selected == this.options[1]) {
          //   this.postData("chatbot", newMessage);
          // }
          // console.log(data);
          return; // Success, exit the loop
        } catch (error) {
          console.error(error);
          if (maxRetries > 0) {
            console.log(`Retrying... ${maxRetries} retries left.`);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
          } else {
            console.error(
              "Max retries reached. Unable to process the request."
            );
            // Handle the error in a way suitable for your application
            // For example, you can display a user-friendly error message to the user
          }
        } finally {
          this.loading = false; // Hide the loading animation
        }

        maxRetries--;
      }
    },
    scrollToBottom() {
      const messageBox = this.$refs.messageBox;
      messageBox.scrollTop = messageBox.scrollHeight;
    },
    async handleOptionSelected(selected) {
      this.selected = selected;
      while (this.loading) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms before checking again
      }
      //generisk messages så few-shot og system beskeder ikke bliver vist i chat
      // this.messages = [];
      // this.sendMessage("", 3);
      this.newConversation();
    },
    async handleGptOptionSelected(model) {
      this.model = model;
    },
  },
  mounted() {
    this.newConversation();
    const self = this;
    this.handleClickOutside = function (event) {
      if (!self.$el.contains(event.target)) {
        self.showMenu = false;
      }
    };
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  updated() {
    this.scrollToBottom();
  },
  created() {
    this.selected = this.options[0]; // Set selected option after options are available
    this.model = this.gptOptions[0];
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

/* .chatbox-container {
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Roboto", sans-serif;
} */

.code {
  background-color: black;
  color: white;
  display: block;
  padding: 1rem;
  border-radius: 1rem;
}
.code::first-line {
  color: green;
}
/* .programming-language {
  display: block;
  margin-bottom: 1rem;
} */
.dropDownSelect {
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
.container {
  width: 90vw;
  height: 90vh;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
}

h1 {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: #222;
  padding: 1rem;
  margin: 0;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e7e7e7;
}

.messageBox {
  padding: 1rem;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 400px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.userMessageWrapper,
.chatGptMessageWrapper {
  display: flex;
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
}

.userMessageWrapper {
  flex-direction: row-reverse;
  align-self: flex-end;
}

.chatGptMessageWrapper {
  align-self: flex-start;
}

.userMessageContent,
.chatGptMessageContent {
  max-width: 80%;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  margin-bottom: 0.125rem;
  font-size: 0.875rem;
  line-height: 1.4;
}

.userMessageContent {
  background-color: #1877f2;
  color: white;
  border-top-right-radius: 0;
  padding-right: 1rem;
}

.chatGptMessageContent {
  background-color: #ededed;
  color: #222;
  border-top-left-radius: 0;
}

.inputContainer {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: #f0f0f0;
}

/* .messageInput {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: white;
  border-radius: 1.5rem;
  margin-right: 0.5rem;
} */
.messageInput {
  flex-grow: 1; /* Ensures the textarea takes up available space */
  border: none;
  outline: none;
  padding: 0.75rem; /* Padding inside the textarea */
  font-size: 1rem; /* Font size of the text */
  background-color: white;
  border-radius: 1rem; /* Rounded corners */
  margin-right: 0.5rem;
  resize: none; /* Disables resizing */
  overflow: auto; /* Ensures proper scrolling */
  line-height: 1.5; /* Adjust line height for better readability */
}

.askButton,
.loadingButton {
  background-color: #1877f2;
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 1.5rem;
  transition: background-color 0.3s ease-in-out;
  min-width: 4.5rem;
  position: relative;
}

/* Specific styles for the loadingButton class */
.loadingButton {
  color: #cdcdcd;
  background-color: #a6a6a6;
  cursor: auto;

  /* visibility: hidden; */
}

/* Hover styles for both classes */
.askButton:hover {
  background-color: #145cb3;
}
GptSelector {
  padding: 10rem;
}

.buttonContainer {
  display: flex;
  justify-content: space-between;
  padding: 8px; /* Adjust the margin as needed */
  align-items: center;
}
.slidecontainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.kealogo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}

.kealogo img {
  height: 5rem;
}

.kealogo button {
  order: 3;
}

.center-logo {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

.kealogo .dropdown {
  order: 2;
  flex-grow: 1;
}
.dropdown-wrapper {
  position: relative;
}
.dropdown {
  position: absolute;
  /* transform: translateX(-50%); */
  /* left: -10; */
  transition: opacity 0.5s ease-in-out;
  background-color: rgba(0, 0, 0, 0.8);
  margin-top: 0.5rem;
  width: 4.5rem;
  padding: 0rem 0.5rem;
  border-radius: 1rem;
  z-index: 2;
  cursor: pointer;
  max-height: 20rem;
  overflow: scroll;
}
.dropdown p {
  display: block;
  color: #cdcdcd;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1rem;
  font-size: 0.6rem;
}
.dropdown p:hover {
  color: #ffffff;
}
.dropdown.show {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .small-screen {
    display: none;
  }
}
@media only screen and (max-width: 768px) {
  .large-screen {
    display: none;
  }
}
</style>
