<template>
  <div class="container">
    <NetworkModal :show="showModal" @update:show="showModal = $event" />
    <!-- <h1>Gailab</h1> -->
    <img src="@/assets/img/KEA_logo_DK_Web_gai.jpg" class="headerLogo" />
    <!-- <p class="last-updated"><em>Sidst opdateret 17/8-2023</em></p> -->

    <h2>Velkommen til GAI-LAB!</h2>
    <p>
      KEA’s online laboratorium om generative artificial intelligence (GAI).<br /><br />
      En portal for viden, ressourcer og spørgsmål om G-AI. GAI-LAB danner
      rammer for fælles dialog om G-AI, så vi får et samlingssted for indsigt i
      muligheder, men også begrænsninger med G-AI. Måske har du en erfaring, du
      vil dele, eller du søger information om retningslinjer, nyeste viden eller
      dygtige kolleger. Derfor inviterer GAI-LAB alle til at dele deres
      betragtninger om, bekymringer for og ideer til AI udviklingen for os her
      på KEA.
    </p>
    <h3>Hvad kan du på GAI-LAB?</h3>

    <router-link to="/nyheder" class="link"
      ><i class="bi bi-arrow-right"></i>
      <span class="link-text">
        Læs om de nyeste tendenser indenfor generativ AI.
      </span>
    </router-link>
    <router-link to="/events" class="link"
      ><i class="bi bi-arrow-right"></i>
      <span class="link-text"> Se relevante events om AI. </span>
    </router-link>
    <!-- <router-link to="/survey" class="link"
      ><i class="bi bi-arrow-right"></i>
      <span class="link-text">
        Chat med vores nyudviklede survey-chatbot GAIA om dine erfaringer med
        generativ AI
      </span>
    </router-link> -->
    <router-link to="/network" class="link"
      ><i class="bi bi-arrow-right"></i>
      <span class="link-text">
        Tilmeld dig udviklingsnetværket for G-AI-brug og -bevidsthed på
        KEA</span
      >
    </router-link>
    <router-link to="/liveblog" class="link">
      <i class="bi bi-arrow-right"></i>
      <span class="link-text">
        Bidrag med ideer og erfaringer og refleksioner til G-AI på KEA på Q&A
        bloggen
      </span>
    </router-link>
    <router-link to="/chatgpt" class="link"
      ><i class="bi bi-arrow-right"></i>
      <span class="link-text"> Prøv Chat-GPT4 uden at oprette en bruger </span>
    </router-link>
    <p>
      De perspektiver du eller din kollega bidrager med på GAI-LAB, er med til
      at udvikle GAI-LAB til et online AI-ressourcecenter der kan styrke brugen
      og bevidstheden om AI på KEA.
    </p>
    <img src="@/assets/img/ai_frontpage2.jpeg" />
    <h3>Aktuelle aktiviteter om G-AI på KEA</h3>
    <ul>
      <li>
        Udvikling af officielle retningslinjer for brug af G-AI ved Louise
        Kehler
      </li>
      <li>
        Tilgængelige AI software og vejledning i Tech og Story Lab ved Frederick
        Lehmann Rosling
      </li>
      <li>Videndeling med Dania om AI og eksamen ved Jonas Milo Plum</li>

      <li>
        Forskningsprojekt om erhvervslivets adoption af AI
        programmerings-redskaber ved Benjamin Hughes
      </li>
      <li>
        <a href="http://projekter.kea.dk/assets/gai/review.pdf" target="_blank"
          >Review</a
        >
        om AI og risici set fra et governance perspektiv ved Jesper Balslev
      </li>
      <li>AI-tilvalgsfag på Digital Konceptudvikling ved Mikkel Meldgaard</li>
    </ul>
    <p>
      Er der AI-aktiviteter på KEA vi ikke endnu ikke kender til? Så giv os
      gerne besked på saro@kea.dk eller marg@kea.dk
    </p>
    <p class="last-updated">
      27.11.23 Martin Gundtoft, Sarah O’Neill, Forskning, Karriere og Relationer
    </p>
    <!-- <h3>Hvilke erfaringer har vi allerede gjort os?</h3>
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
    </p> -->
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

.link {
  color: #1877f2;
  margin-bottom: 0.5rem;
}
.link-text {
  font-weight: 500;
}
.link:hover {
  color: #145cb3;
}

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
