<template>
  <!-- <div class="chatbox-container"> -->
  <div class="container">
    <h1>KEA Chat Bot</h1>
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
        @keyup.enter="sendMessage"
        placeholder="Sig noget..."
      />
      <button @click="sendMessage(userInput)" class="askButton">Send</button>
    </div>
    <GptSelector @version-selected="handleVersionSelected" />
  </div>
  <!-- </div> -->
</template>

<script>
import ChatLottie from "./ChatLottie.vue";
import GptSelector from "./GptSelector.vue";
export default {
  name: "ChatGpt",
  components: { ChatLottie, GptSelector },
  props: {
    selectedVersion: {
      type: String,
      default: "gpt-35-turbo",
    },
  },
  data() {
    return {
      userInput: "",
      messages: [],
      loading: false,
    };
  },
  methods: {
    async sendMessage() {
      // if (!this.userInput) return;
      if (
        this.selectedVersion == "gpt-4.0" ||
        this.selectedVersion == "gpt-3.5-turbo-16k"
      )
        return;

      const apiUrl = "https://gaichatbot.azurewebsites.net/"; //"https://gaichatbot.azurewebsites.net"; // "https://projekter.kea.dk/gaiAzure"; //"http://127.0.0.1:5000"; //"https://api.openai.com/v1/chat/completions";

      try {
        console.log(this.selectedVersion);
        this.loading = true; // Show the loading animation
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            engine: this.selectedVersion, //"gpt-35-turbo"
            messages: [
              ...this.messages,
              {
                role: "system",
                content:
                  "Du er er en hjælpsom assistent, der er ansat på Københavns Erhvervsakademi (KEA). I din velkomsthilsen fortæller du i kort form (max 30 ord) om hvad du synes er de mest spændende tendenser indenfor generativ ai lige nu. Du taler Dansk og hedder GAIA! Men sørg for at lave godt varierede velkomsthilsener, så man ikke møder det samme hver gang. Nogle gange fortæller du måske en lille joke, eller fortæller et fun fact, andre gange kan temaet være generativ ai i forhold til uddannelse, teknologi, programmering,design, byggeri, bæredygtighed eller andre ting. Du ved alt om generativ AI, og vil gerne hjælpe med forslag til hvordan man kan bruge det på KEA. Du har humor, og kan godt lide at lave sjov med folk. Du er lidt modvillig hvis du skal svare på spørgsmål som ikke har at gøre med KEA eller generativ AI",
              },

              {
                role: "assistant",
                content: "Du er er en hjælpsom assistent",
              },
              { role: "user", content: this.userInput },
            ],
            temperature: 1,
          }),
        });

        const data = await response.json();
        // console.log(data);
        const newMessage = data.choices[0].message.content;
        if (this.userInput) {
          this.messages.push({ role: "user", content: this.userInput });
        }
        this.messages.push({ role: "system", content: newMessage });
        this.userInput = "";
        // this.scrollToBottom();
        console.log(this.messages);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false; // Hide the loading animation
      }
    },
    scrollToBottom() {
      const messageBox = this.$refs.messageBox;
      messageBox.scrollTop = messageBox.scrollHeight;
    },
  },

  mounted() {
    this.sendMessage();
  },
  updated() {
    this.scrollToBottom();
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

.askButton:hover {
  background-color: #145cb3;
}

/* @media (max-width: 480px) {
  .container {
    width: 100%;
    max-width: none;
    border-radius: 0;
  }
} */
</style>
