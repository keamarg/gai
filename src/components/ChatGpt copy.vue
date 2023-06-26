<template>
  <div class="chat-container">
    <div class="message-container">
      <div class="response-container" ref="responseContainer">
        <div v-for="message in messages" :key="message.id" class="message">
          <div class="prompt" v-if="message.role === 'system'">
            {{ message.content }}
          </div>
          <div class="response" v-else>{{ message.content }}</div>
        </div>
      </div>
      <input
        v-model="userInput"
        type="text"
        placeholder="Stil et spørgsmål"
        @keyup.enter="sendMessage"
        class="input-field"
        :disabled="loading"
      />
      <button @click="sendMessage" :disabled="loading">Send</button>
      <ChatLottie v-if="loading" width="2rem" height="2rem" margin="1rem" />
    </div>
  </div>
</template>

<script>
import ChatLottie from "./ChatLottie.vue";
export default {
  name: "ChatGpt",
  components: {
    ChatLottie,
  },
  props: {
    selectedVersion: {
      type: String,
      default: "gpt-3.5-turbo",
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
      if (!this.userInput) return;
      if (this.selectedVersion == "gpt-4.0") return;

      const apiUrl = "http://127.0.0.1:5000"; // "https://projekter.kea.dk/gai"; //"http://127.0.0.1:5000"; //"https://api.openai.com/v1/chat/completions";

      try {
        this.loading = true; // Show the loading animation
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            model: this.selectedVersion,
            messages: [
              ...this.messages,

              {
                role: "system",
                content:
                  "Du er er en hjælpsom assistent, der er ansat på Københavns Erhvervsakademi (KEA). I din velkomsthilsen fortæller du i kort form (max 30 ord) om hvad du synes er de mest spændende tendenser indenfor generativ ai lige nu. Du taler Dansk og hedder GAIA! Men sørg for at lave godt varierede velkomsthilsener, så man ikke møder det samme hver gang. Nogle gange fortæller du måske en lille joke, eller fortæller et fun fact, andre gange kan temaet være generativ ai i forhold til uddannelse, teknologi, programmering,design, byggeri, bæredygtighed eller andre ting. Du ved alt om generativ AI, og vil gerne hjælpe med forslag til hvordan man kan bruge det på KEA. Du har humor, og kan godt lide at lave sjov med folk. Du er lidt modvillig hvis du skal svare på spørgsmål som ikke har at gøre med KEA eller generativ AI",
              },
              { role: "user", content: this.userInput },
            ],
            temperature: 1,
          }),
        });

        const data = await response.json();
        const newMessage = data.choices[0].message.content;
        this.messages.push({ role: "system", content: this.userInput });
        this.messages.push({ role: "user", content: newMessage });
        this.userInput = "";
        this.scrollToBottom();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false; // Hide the loading animation
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const responseContainer = this.$refs.responseContainer;
        responseContainer.scrollTop = responseContainer.scrollHeight;
      });
    },
  },

  watch: {
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
  mounted() {
    this.scrollToBottom();
    this.sendMessage();
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  align-items: flex-start;
  background-color: white;
  padding: 10px;
}

.message-container {
  width: 600px;
  margin-right: 10px;
  overflow-y: auto;
}

.response-container {
  margin-bottom: 10px;
}

.message {
  margin-bottom: 10px;
}

.prompt {
  font-weight: bold;
}

.input-container {
  position: relative;
  width: 100%;
}

.input-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
</style>

<!-- curl -X POST -H "Content-Type: application/json" -d '{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "Du er hjælpsom"
    },
    {
      "role": "user",
      "content": "Hej"
    }
  ],
  "temperature": 1
}' "https://projekter.kea.dk/gai" -->
