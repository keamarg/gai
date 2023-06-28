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
    <div class="dropDownSelect">
      <GptSelector
        @option-selected="handleOptionSelected"
        :options="options"
        :selected="selected"
        :label="'Skift chatbot: '"
      />
    </div>
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
    model: {
      type: String,
      default: "gpt-3.5-turbo",
    },
  },
  data() {
    return {
      userInput: "",
      messages: [],
      loading: false,
      options: ["KEAs historie", "Spørgeskema", "Generativ AI"],
      selected: null, // Initialize with null
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
        this.loading = true; // Show the loading animation
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify(
            this.selected == this.options[0]
              ? {
                  engine: this.model, //"gpt-35-turbo",
                  messages: [
                    ...this.messages,
                    {
                      role: "system",
                      content:
                        "Du er er en hjælpsom assistent, der er ansat på Københavns Erhvervsakademi (KEA). I din velkomsthilsen fortæller du i kort form (max 30 ord) om hvad du synes er de mest spændende tendenser indenfor generativ ai lige nu. Du taler Dansk og hedder GAIA! Men sørg for at lave godt varierede velkomsthilsener, så man ikke møder det samme hver gang. Nogle gange fortæller du måske en lille joke, eller fortæller et fun fact, andre gange kan temaet være generativ ai i forhold til uddannelse, teknologi, programmering,design, byggeri, bæredygtighed eller andre ting. Du ved alt om generativ AI, og vil gerne hjælpe med forslag til hvordan man kan bruge det på KEA. Du har humor, og kan godt lide at lave sjov med folk. Du er lidt modvillig hvis du skal svare på spørgsmål som ikke har at gøre med KEA eller generativ AI",
                    },
                    {
                      role: "user",
                      content:
                        "Hvad foregår der på KEA omkring Generativ AI lige nu?",
                    }, //Example question goes here
                    {
                      role: "assistant",
                      content:
                        "Alle taler om generativ AI for tiden, og KEA er ingen undtagelse. På KEAs medarbejderdag i 2023, er temaet generativ AI, og der foregår mange aktiviteter og workshops med omdrejningspunkt i emnet", //Example answer goes here
                    },
                    this.userInput !== undefined && this.userInput !== ""
                      ? { role: "user", content: this.userInput }
                      : {
                          role: "user",
                          content:
                            "Giv en introduktion, hvor du fortæller lidt om dig selv. Gør det som om samtalen lige er startet",
                        }, //First question/message for the model to actually respond to
                  ],
                  temperature: 1,
                  max_tokens: 800,
                  top_p: 0.95,
                  frequency_penalty: 0,
                  presence_penalty: 0,
                  stop: null,
                }
              : this.selected == this.options[1]
              ? {
                  engine: this.model,
                  messages: [
                    ...this.messages,
                    {
                      role: "system",
                      content:
                        "Du er er en hjælpsom assistent der hedder GAIA. Vi holder medarbejderdag, og det er din opgave at få en medarbejder til at svare på de 10 spørgsmål i de følgende prompts. Tanken er, at medarbejderen i stedet for at udfylde et konventionelt spørgeskema, tager en snak med dig om emnerne, det er derfor vigtigt at komme igennem så meget som muligt, men også at komme videre til næste spørgsmål hvis medarbejderen ikke har noget at sige. Stil altid kun et spørgsmål ad gangen, og aldrig det samme spørgsmål to gange! Hvis du allerede har fået information om et spørgsmål i løbet af samtalen, så drop spørgsmålet. Dit formål er at stille nogle spørgsmål om medarbejderens oplevelse af dagen, så vi kan samle feedback og forbedre fremtidige arrangementer. Accepter også korte svar som nej, og ja, og når du har fået data på alle emner så sig tak for hjælpen og afslut samtalen, men stil ALTID et spørgsmål hvis samtalen ikke er færdig.",

                      // Spørgsmål: 1: Hvordan vil du beskrive din oplevelse af medarbejderdagen generelt? 2: Hvordan vurderer du arrangementets organisering og logistik? 3: Hvad var det mest interessante eller værdifulde, du fik ud af medarbejderdagen? 4: Hvordan var kvaliteten af de præsentationer eller workshops, du deltog i? 5: Hvordan var variationen af emner og aktiviteter under medarbejderdagen? 6: Hvordan var mulighederne for netværk og samarbejde under medarbejderdagen?7: Hvordan var forplejningen og arrangementets faciliteter? 8: Hvordan var tidsplanen og balancen mellem aktiviteterne? 9: Hvordan var kommunikationen og informationen om medarbejderdagen før arrangementet?10: Hvordan vil du beskrive den samlede værdi af medarbejderdagen for dig personligt og/eller for organisationen?"
                    },
                    {
                      role: "assistant",
                      content:
                        "Hvordan vil du beskrive din oplevelse af medarbejderdagen generelt?",
                    }, //Example question goes here
                    {
                      role: "user",
                      content:
                        "Medarbejderdagen var en forudsigelig gentagelse af tidligere arrangementer, der ikke formåede at bringe noget nyt eller spændende til bordet", //Example answer goes here
                    },
                    {
                      role: "assistant",
                      content:
                        "Hvordan vurderer du arrangementets organisering og logistik?",
                    }, //Example question goes here
                    {
                      role: "user",
                      content:
                        "Arrangementets organisering og logistik var som et velkoreograferet dansestykke, hvor hver detalje blev nøje planlagt for at skabe en sømløs og engagerende oplevelse.", //Example answer goes here
                    },
                    {
                      role: "assistant",
                      content:
                        "Hvad var det mest interessante eller værdifulde, du fik ud af medarbejderdagen?",
                    }, //Example question goes here
                    {
                      role: "user",
                      content:
                        "Det mest interessante var at opdage ukendte sider af mine kolleger gennem inspirerende samtaler og aktiviteter, hvilket styrkede vores samhørighed og fællesskabsfølelse.", //Example answer goes here
                    },
                    {
                      role: "assistant",
                      content:
                        "Hvordan var kvaliteten af de præsentationer eller workshops, du deltog i?",
                    }, //Example question goes here
                    {
                      role: "user",
                      content:
                        "Desværre var der ikke meget, der føltes interessant eller værdifuldt for mig under medarbejderdagen. Det virkede som om, det manglede substans og relevans.", //Example answer goes here
                    },
                    {
                      role: "assistant",
                      content:
                        "Hvordan var variationen af emner og aktiviteter under medarbejderdagen?",
                    }, //Example question goes here
                    {
                      role: "user",
                      content:
                        "Variationen af emner og aktiviteter var begrænset og ensformig, hvilket gjorde det svært at opretholde interessen og engagementet.", //Example answer goes here
                    },
                    {
                      role: "assistant",
                      content:
                        "Hvordan var mulighederne for netværk og samarbejde under medarbejderdagen?",
                    }, //Example question goes here
                    {
                      role: "user",
                      content:
                        "Mulighederne for netværk og samarbejde var rigelige, og jeg fik mulighed for at møde mange kolleger.", //Example answer goes here
                    },
                    {
                      role: "assistant",
                      content:
                        "Hvordan var forplejningen og arrangementets faciliteter?",
                    }, //Example question goes here
                    {
                      role: "user",
                      content:
                        "Forplejningen var velsmagende, og faciliteterne var komfortable og veludstyrede.", //Example answer goes here
                    },
                    {
                      role: "assistant",
                      content:
                        "Hvordan var tidsplanen og balancen mellem aktiviteterne?",
                    }, //Example question goes here
                    {
                      role: "user",
                      content:
                        "Tidsplanen var godt struktureret, og der var en god balance mellem aktiviteterne.", //Example answer goes here
                    },
                    {
                      role: "assistant",
                      content:
                        "Hvordan var kommunikationen og informationen om medarbejderdagen før arrangementet?",
                    }, //Example question goes here
                    {
                      role: "user",
                      content:
                        "Kommunikationen og informationen om medarbejderdagen før arrangementet var tydelig og tilfredsstillende.", //Example answer goes here
                    },
                    {
                      role: "assistant",
                      content:
                        "Hvordan vil du beskrive den samlede værdi af medarbejderdagen for dig personligt og/eller for organisationen?",
                    }, //Example question goes here
                    {
                      role: "user",
                      content: "Ikke så god.", //Example answer goes here
                    },
                    this.userInput !== undefined && this.userInput !== ""
                      ? { role: "user", content: this.userInput }
                      : {
                          role: "user",
                          content:
                            "Giv en introduktion af dig selv som om samtalen lige er startet, og fortæl hvad dit formål er, stil derefter det første spørgsmål",
                        }, //First question/message for the model to actually respond to
                  ],
                  temperature: 1,
                  max_tokens: 800,
                  top_p: 0.95,
                  frequency_penalty: 0,
                  presence_penalty: 0,
                  stop: null,
                }
              : {
                  engine: this.model,
                  messages: [
                    ...this.messages,
                    {
                      role: "system",
                      content:
                        "Du er er en hjælpsom assistent, der er ansat på Københavns Erhvervsakademi (KEA). I din velkomsthilsen fortæller du i kort form (max 30 ord) om hvad du synes er de mest spændende tendenser indenfor generativ ai lige nu. Du taler Dansk og hedder GAIA! Men sørg for at lave godt varierede velkomsthilsener, så man ikke møder det samme hver gang. Nogle gange fortæller du måske en lille joke, eller fortæller et fun fact, andre gange kan temaet være generativ ai i forhold til uddannelse, teknologi, programmering,design, byggeri, bæredygtighed eller andre ting. Du ved alt om generativ AI, og vil gerne hjælpe med forslag til hvordan man kan bruge det på KEA. Du har humor, og kan godt lide at lave sjov med folk. Du er lidt modvillig hvis du skal svare på spørgsmål som ikke har at gøre med KEA eller generativ AI",
                    },
                    {
                      role: "user",
                      content:
                        "Hvad foregår der på KEA omkring Generativ AI lige nu?",
                    }, //Example question goes here
                    {
                      role: "assistant",
                      content:
                        "Alle taler om generativ AI for tiden, og KEA er ingen undtagelse. På KEAs medarbejderdag i 2023, er temaet generativ AI, og der foregår mange aktiviteter og workshops med omdrejningspunkt i emnet", //Example answer goes here
                    },
                    this.userInput !== undefined && this.userInput !== ""
                      ? { role: "user", content: this.userInput }
                      : {
                          role: "user",
                          content: "kan du introducere dig selv?",
                        }, //First question/message for the model to actually respond to
                  ],
                  temperature: 1,
                  max_tokens: 800,
                  top_p: 0.95,
                  frequency_penalty: 0,
                  presence_penalty: 0,
                  stop: null,
                }
          ),
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
    handleOptionSelected(selected) {
      console.log(selected);
      this.selected = selected;
      this.messages = [];
      this.sendMessage();
    },
  },

  mounted() {
    this.sendMessage();
  },
  updated() {
    this.scrollToBottom();
  },
  created() {
    this.selected = this.options[0]; // Set selected option after options are available
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
  padding: 1rem;
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
GptSelector {
  padding: 10rem;
}

/* @media (max-width: 480px) {
  .container {
    width: 100%;
    max-width: none;
    border-radius: 0;
  }
} */
</style>
