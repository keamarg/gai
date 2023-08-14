<template>
  <div class="container">
    <NetworkModal :show="showModal" @update:show="showModal = $event" />
    <!-- <h1>Gailab</h1> -->
    <img src="@/assets/img/KEA_logo_DK_Web_gai.jpg" class="headerLogo" />
    <p class="last-updated"><em>Sidst opdateret 14/8-2023</em></p>

    <h2>AI udviklingen på KEA - hvilken vej skal vi?</h2>
    <p>
      Diskussionen om og afprøvningen af G-AI er allerede godt i gang på KEA,
      men vi har behov for at få skabt en fælles dialog omkring hvad KEA vil og
      skal med G-AI og hvad KEA i forlængelse heraf har behov for at vide.
      Derfor vil vi gerne invitere alle medarbejder på KEA til at dele deres
      betragtninger om, bekymringer for og ideer til AI udviklingen på KEA.
    </p>
    <div class="links">
      <router-link to="/survey">
        <button class="askButton">Deltag i undersøgelse</button>
      </router-link>
      <router-link to="/liveblog">
        <button class="askButton">Kommenter på Liveblog</button>
      </router-link>
    </div>
    <div class="links">
      <button class="askButton" @click="this.showModal = true">
        Deltag i netværket
      </button>
      <router-link to="/chatgpt">
        <button class="askButton">Prøv Chat-GPT4</button>
      </router-link>
    </div>
    <img
      src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Advantages_and_Disadvantages_of_artificial_intelligence.jpg"
    />
    <h3>Hvilken viden har vi?</h3>
    <p>
      Hvad er Generativ AI og eksempler på værktøjer? Hvem står bag kendte
      værktøjer? Hvordan virker det? Hvad er det ikke?
    </p>
    <h3>Hvilke erfaringer har vi allerede gjort os?</h3>
    <p>
      Har du anvendt Generativ AI i dit arbejde? JA- Til hvad? Gode erfaringer?
      Problemer du er stødt på? Nej- Har du lyst JA- Har du ideer til hvilke af
      dine opgaver du kunne Generativ AI til at løse? Hvilke? Vil du gerne vide
      mere om hvordan du kunne anvende Generativ AI i dit arbejder?
    </p>
    <h3>Hvad har vi brug for at vide og prøve?</h3>
    <p>
      Hvilke AI kompetencer har underviser brug for? Hvilke AI kompetencer har
      de studerende brug for? Hvilken indflydelse af G-AI på vores
      studieordninger og læringsmål? Hvilken indflydelse har G-AI på vores
      prøvning og opgaveformulering? Hvilken indflydelse har G-AI på vores måde
      at lære på? Hvad er det vigtigt, at vi får talt om som organisation og
      sektor? Hvad kan KEA bruge G-AI til?
    </p>
    <h3>Invitation til udviklingsnetværk</h3>
    <p>
      Netværket skal samle den viden, der er på KEA vedr generativ AI og som vi
      forventer udvikler og rykker sig meget. Den samlede viden vil vi så
      formidle og udvikle løbende på en platform tilgængelig for alle på KEA.
      Det er vigtigt at udviklingsnetværket bliver sammensat på tværs af lag og
      afdelinger og interesser i organisationen så vi kan møde den kompleksitet
      som AI teknologierne skaber med et multifokalt blik. Vil du være med?
    </p>

    <div class="links">
      <button class="askButton" @click="this.showModal = true">
        Deltag i netværket
      </button>
    </div>
    <img
      src="https://assets.gatesnotes.com/8a5ac0b3-6095-00af-c50a-89056fbe4642/11eeb7f9-7512-49aa-abdc-a27001dd123e/AI_20230215_article-hero_1200x564.jpg"
    />
    <h3>AI Udviklingsrummet</h3>
    <p>
      Udviklingsrummet er KEA’s ressourcecenter for AI der skal styrke
      bevidstheden om, og brugen af, AI på KEA og i erhvervslivet.
      Udviklingsrummet skal løbende udvikles og opereres af KEA’s
      AI-udviklingsnetværk. Med Udviklingsrummet som kundepunkt for KEA’s
      indsamling og viderformidling viden, tiltag og processer vedrørende AI vil
      vi overskueliggøre og tilgængeliggøre intern og ekstern G-AI viden og
      muligheder. Ressourcecenteret skal desuden muliggøre samarbejder med
      virksomheder og institutioner, der har en interesse for AI området og
      tilbyde workshops til både interne og eksterne interesserede.
    </p>
    <h3>Aktuelle tilbud, indsatser og aktiviteter</h3>
    <p>
      Udvikling af retningslinjer (Louise) Udvikling af et AI tilvalgsfag
      (Mikkel) Forskningsprojekt om erhvervslivets adoption af AI
      programmerings-redskaber (Benjamin) Tilgængelig AI software (Frederick)
      Aktuelle AI afprøvninger i organisationen (specificeres brug af AI som
      partner i arbejdsprocesser, eksamensformer) Kurser og workshops
    </p>
    <h3>Retningslinjer</h3>
    <p>
      Louise skriv om løbende udvikling og opdatering på baggrund af
      grundlæggende principper Vejledning til studerendes brug af G-AI
      Vejledning til underviseres brug af G-AI Vejledning til medarbejder brug
      af G-AI
    </p>
    <h3>Nyhedsoverblik</h3>
    <p>Martin og Sarah?</p>
    <h3>Pædagogiske og didaktiske perspektiver</h3>
    <p>Mettes skriv?</p>
    <h3>Forskningen</h3>
    <p>
      Morten skriv om forskning i og med AI? Projektbeskrivelser af igangværende
      forsknings og udviklingsprojekter Vidensprodukter og afrapporteringer fra
      afsluttede forsknings og udviklingsprojekter
    </p>
    <h3>Samarbejder</h3>
    <p>
      Erhvervssamarbejder (Signe) Forskning- og udviklingssamarbejder
      Internationale og nationale institutionsamarbejder (Anne og ?)
    </p>
  </div>
</template>

<script>
import NetworkModal from "@/components/NetworkModal.vue";

export default {
  name: "HomeView",
  props: {},
  data() {
    return {
      showModal: false,
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  updated() {},
  created() {},
  components: { NetworkModal },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

.last-updated {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 1rem;
}
.container {
  /* width: 90vw;
  height: 90vh; */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  font-family: "Roboto", sans-serif;
  padding: 2rem;
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
  /* margin-bottom: 1rem; */
  margin: 1rem;
}

/* Hover styles for both classes */
.askButton:hover {
  background-color: #145cb3;
}
.links {
  display: flex;
  justify-content: space-around;
}
</style>
