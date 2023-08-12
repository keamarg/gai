<template>
  <!-- <div class="chatbox-container"> -->
  <div class="container">
    <div class="kealogo">
      <!-- <img src="../assets/img/KEA_logo_DK_Web_gai.jpg" /> -->
      <ChatLottie width="5rem" height="5rem" margin="" />
    </div>
    <div class="messageBox mt-8" ref="messageBox">
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
            {{ message.content }}
          </div>
        </div>
      </template>
      <ChatLottie v-if="loading" width="2rem" height="2rem" margin="1rem" />
    </div>
    <div class="inputContainer">
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
    </div>
    <div class="buttonContainer">
      <!-- <div>
        <GptSelector
          @option-selected="handleOptionSelected"
          :options="options"
          :selected="selected"
          :label="label"
        />
      </div> -->
      <button
        @click="newConversation()"
        :class="{
          askButton: !loading,
          loadingButton: loading,
        }"
      >
        Ny samtale
      </button>
    </div>
  </div>
  <!-- </div> -->
  <div
    v-if="getUser.username == 'ping' && getUser.keaid == 'pong'"
    class="hiddenButtonContainer"
  >
    <button @click="getData('json')" class="askButton">Hent data (json)</button>
    <button @click="getData('xlsx')" class="askButton">Hent data (xlsx)</button>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import messages from "@/data/messages.json";
import ChatLottie from "./ChatLottie.vue";
// import GptSelector from "./GptSelector.vue";
import { useUserStore } from "@/store";

export default {
  name: "ChatGpt",
  components: { ChatLottie },
  props: {
    model: {
      type: String,
      default: "gpt-3.5-turbo",
    },
  },
  data() {
    return {
      userInput: "",
      loading: false,
      options: ["KEAs historie", "Spørgeskema", "Generativ AI", "Netværk"],
      selected: null, // Initialize with null
      label: "",
      messages: [],
      questionnaireMessages: messages.questionnaireMessages,
      historyMessages: messages.historyMessages,
      gaiMessages: messages.gaiMessages,
      networkMessages: messages.networkMessages,
      uniqueID: "",
      apiUrl: process.env.VUE_APP_APIURL, //"https://gaichatbot.azurewebsites.net/database", //"http://127.0.0.1:5000/database" //"https://gaichatbot.azurewebsites.net/database"
      apiUrl_CHATDB: process.env.VUE_APP_APIURL_CHATDB,
    };
  },
  computed: {
    getUser() {
      return { username: useUserStore().username, keaid: useUserStore().keaId };
    },
    getMessages() {
      if (this.selected == "Spørgeskema") {
        return this.questionnaireMessages;
      } else if (this.selected == "KEAs historie") {
        return this.historyMessages;
      } else if (this.selected == "Generativ AI") {
        return this.gaiMessages;
      } else if (this.selected == "Netværk") {
        return this.networkMessages;
      }
      return this.messages;
    },
  },
  methods: {
    newConversation() {
      if (!this.loading) {
        this.messages = [];
        localStorage.removeItem("uniqueID");
        this.generateUniqueID();
        this.sendMessage(this.message, 3);
      }
    },
    generateUniqueID() {
      const existingID = localStorage.getItem("uniqueID");
      if (existingID) {
        this.uniqueID = existingID;
      } else {
        const randomID =
          Date.now().toString(36) + Math.random().toString(36).slice(2, 11);
        this.uniqueID = randomID;
        localStorage.setItem("uniqueID", randomID);
      }
    },
    async getData(format) {
      // const apiUrl = process.env.VUE_APP_APIURL;
      try {
        const response = await fetch(this.apiUrl_CHATDB, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.apiKey}`,
          },
        });
        const data = await response.json();
        // console.log(data);

        if (format === "json") {
          // Convert the data to a nicely formatted JSON string
          const dataAsString = JSON.stringify(data, null, 2);

          // Create a Blob with the data as a JSON file
          const blob = new Blob([dataAsString], { type: "application/json" });

          // Create a temporary object URL for the Blob
          const url = URL.createObjectURL(blob);

          // Create a temporary link element to trigger the download
          const downloadLink = document.createElement("a");
          downloadLink.href = url;
          downloadLink.download = "chatdata.json";

          // Append the link to the body and click it to initiate the download
          document.body.appendChild(downloadLink);
          downloadLink.click();

          // Clean up by revoking the object URL and removing the link element
          URL.revokeObjectURL(url);
          document.body.removeChild(downloadLink);
        } else if (format === "xlsx") {
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.aoa_to_sheet([
            ["Session ID", "Message Type", "Message"],
          ]);

          let row = 1;
          let prevSessionId = null;

          for (const sessionId in data) {
            const chatData = data[sessionId];

            for (const [index, message] of chatData.entries()) {
              if (prevSessionId !== sessionId || index === 0) {
                XLSX.utils.sheet_add_aoa(ws, [[sessionId, "", ""]], {
                  origin: row,
                });
                row++;
                prevSessionId = sessionId;
              }

              if (message.user) {
                XLSX.utils.sheet_add_aoa(ws, [["", "User", message.user]], {
                  origin: row,
                });
                row++;
              }
              if (message.chatbot) {
                XLSX.utils.sheet_add_aoa(
                  ws,
                  [["", "Chatbot", message.chatbot]],
                  {
                    origin: row,
                  }
                );
                row++;
              }
            }
          }

          XLSX.utils.book_append_sheet(wb, ws, "Chat Data");
          XLSX.writeFile(wb, "chatdata.xlsx");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async postData(role, content) {
      // const apiUrl = process.env.VUE_APP_APIURL;
      try {
        await fetch(this.apiUrl_CHATDB, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            session_id: this.uniqueID,
            content: content,
            role: role,
          }),
        });
      } catch (error) {
        console.error(error);
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
        if (this.selected == this.options[3]) {
          this.postData("user", message);
        }

        await this.sendMessage(message, 3); // No retries here
      }
    },
    async sendMessage(message, maxRetries) {
      // console.log(this.apiUrl);

      if (
        this.selectedVersion == "gpt-4.0" ||
        this.selectedVersion == "gpt-3.5-turbo-16k"
      )
        return;

      // const apiUrl = process.env.VUE_APP_APIURL;
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
                    temperature: 1,
                    max_tokens: 800,
                    top_p: 0.95,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stop: null,
                    messages: [
                      ...this.historyMessages,
                      message !== undefined && message !== ""
                        ? { role: "user", content: message }
                        : {
                            role: "user",
                            content: "kan du introducere dig selv?",
                          }, //First question/message for the model to actually respond to
                    ],
                  }
                : this.selected == this.options[1]
                ? {
                    engine: this.model,
                    temperature: 0.5,
                    max_tokens: 800,
                    top_p: 0.95,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stop: null,
                    messages: [
                      ...this.questionnaireMessages,

                      message !== undefined && message !== ""
                        ? { role: "user", content: message }
                        : {
                            role: "user",
                            content:
                              "Giv en introduktion af dig selv som om samtalen lige er startet, fortæl om hvordan du gerne vil have svarene, stil derefter det første spørgsmål, og bed om uddybning hvis du ikke er tilfreds med svaret.",
                          }, //First question/message for the model to actually respond to
                    ],
                  }
                : this.selected == this.options[2]
                ? {
                    engine: this.model,
                    temperature: 0.5,
                    max_tokens: 800,
                    top_p: 0.95,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stop: null,
                    messages: [
                      ...this.questionnaireMessages,

                      message !== undefined && message !== ""
                        ? { role: "user", content: message }
                        : {
                            role: "user",
                            content:
                              "Giv en introduktion af dig selv som om samtalen lige er startet, fortæl om hvordan du gerne vil have svarene, stil derefter det første spørgsmål, og bed om uddybning hvis du ikke er tilfreds med svaret.",
                          }, //First question/message for the model to actually respond to
                    ],
                  }
                : {
                    engine: this.model,
                    temperature: 1,
                    max_tokens: 800,
                    top_p: 0.95,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stop: null,
                    messages: [
                      ...this.networkMessages,

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
          if (this.selected == this.options[3]) {
            this.postData("chatbot", newMessage);
          }
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
      this.messages = [];
      this.sendMessage("", 3);
    },
  },

  mounted() {
    this.generateUniqueID();
    this.sendMessage("", 3);
  },
  updated() {
    this.scrollToBottom();
  },
  created() {
    this.selected = this.options[3]; // Set selected option after options are available
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

.messageInput {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: white;
  border-radius: 1.5rem;
  margin-right: 0.5rem;
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
.hiddenButtonContainer {
  display: flex;
  /* justify-content: space-between; */
  padding-top: 1rem; /* Adjust the margin as needed */
  align-items: center;
}
.hiddenButtonContainer button {
  margin-right: 1rem;
}
/* @media (max-width: 480px) {
  .container {
    width: 100%;
    max-width: none;
    border-radius: 0;
  }
} */
.kealogo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.kealogo img {
  height: 5rem;
}
</style>
