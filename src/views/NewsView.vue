<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/img/KEA_logo_DK_Web_gai.jpg" class="headerLogo" />
      <h1>Nyheder</h1>
    </div>
    <h3><i>24/10 2023</i></h3>
    <h2>Ny "State of AI" rapport</h2>
    <p>
      "State of AI" - en årlig tilstandsrapport der de sidste seks år har
      kortlagt og vurderet feltet inden for kunstig intelligens, er netop
      udkommet for 2023. G-AI LAB er dykket ned i rapporten og har her lavet et
      kort overblik over dens mest interessante emner og tendenser.
    </p>
    <div class="imgDiv">
      <a href="https://www.stateof.ai">
        <img
          src="@/assets/img/hal.jpeg"
          class="newsImg"
          alt="https://www.stateof.ai"
        />
      </a>
    </div>

    <ol>
      <li>
        <strong>Hvordan GPT-4 dominerer AI-landskabet.</strong>OpenAI's GPT-4
        model, grundlaget for ChatGPT, har været i fokus i det seneste år. GPT-4
        er anerkendt som den mest modne og kraftfulde store sprogmodel på
        markedet. Den har demonstreret evnen til at bestå
        universitetsniveau-eksaminer inden for fag som jura og medicin ud over
        klassiske NLP-benchmarks.
      </li>
      <li>
        <strong
          >Hvordan RLHF har bevist sit værd og hvorfor det alligevel kritiseres
          kraftigt.</strong
        >
        GPT-4 er trænet ved hjælp af "reinforcement learning from human
        feedback" (RLHF), hvor menneskelige testere vurderer modelresultater.
        RLHF er afgørende for præstationen af brugervenlige chatbots som
        ChatGPT. Kritik er rejst angående de økonomiske og menneskelige
        omkostninger ved RLHF og beskæftigelsen af mange testere./li>
      </li>

      <li>
        <strong
          >Hvordan en ny tidsånd af mindre vidensdeling og gennemsigtighed vandt
          frem.</strong
        >
        Tidligere var offentliggørelse af forskningsresultater kutyme, men store
        kommercielle AI-selskaber som OpenAI og Google er blevet mere lukkede.
        Tekniske rapporter om ny AI-teknologi indeholder færre tekniske detaljer
        og øger hemmeligholdelsen. Lukkethed og tekniske rapporter med begrænset
        information er blevet normalen i AI-industrien.
      </li>
      <li>
        <strong
          >Kan Generativ AI's popularitet oversættes til økonomisk
          gevinst?</strong
        >
        Generative AI-produkter som ChatGPT oplever betydelig brugervækst, men
        det er uklart, om indtægterne følger med. Driftsomkostningerne for
        generative AI-produkter som ChatGPT er høje. Venturekapitalister
        investerer i AI-selskaber i USA og UK, mens investeringer i EU falder
        muligvis på grund af kommende AI-regulering.
      </li>
      <li>
        <strong>Chipefterspørgslen og produktion stiger dramatisk.</strong>
        Stigende investeringer i generativ AI øger behovet for GPU'er, som er
        afgørende for træning af moderne AI-modeller. NVIDIAs aktiekurs og
        omsætning er steget dramatisk på grund af stigende efterspørgsel efter
        GPU'er. Flere lande er involveret i en global kamp om kontrol over
        chipproduktion og eksport. Denne "chip-krig" er tydeligst imellem, men
        ikke begrænset til, USA og Kina.
      </li>
      <li>
        <strong
          >Forskelligartede AI-Reguleringer bliver lige nu udarbejdet og
          vedtaget over hele verden. </strong
        >Lande som Indien og England vedtager en "light-touch" tilgang til
        AI-regulering ved at bruge eksisterende lovgivning og kun indføre nye
        love, hvor det er nødvendigt. Kina og EU arbejder på omfattende
        AI-lovgivning baseret på samfunds- og risikoområder. USA og Canada tager
        en hybridtilgang og vedtager forskellige love på delstatsniveau og
        regulering i højrisikoindustrier.
      </li>
      <li>
        <strong
          >Sikkerhed og trusler Debatten om AI-bevidsthed og sikkerhed har fået
          meget opmærksomhed, men der er stadig stor usikkerhed omkring hvilke
          reelle trusler vi går i møde.</strong
        >
        Både politikere og eksperter tager spørgsmålet om AI-sikkerhed
        alvorligt. En AI Safety Summit planlægges lige nu i London for at
        diskutere sikkerhedsaspekterne ved AI og mødes med verdens ledere og
        eksperter på området.
      </li>
    </ol>
    <a href="https://www.stateof.ai"
      >Hele rapporten kan findes her: https://www.stateof.ai</a
    >
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
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
.header {
  display: flex;
  align-items: center;
}
.headerLogo {
  width: 4rem;
  margin-right: 1rem;
}
li {
  margin-bottom: 1rem;
}
h2 {
  margin-bottom: 0rem;
}
h3 {
  margin-bottom: 0rem;
}
a {
  color: gray;
}
a:visited {
  color: gray;
}
a:hover {
  color: darkgray;
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .newsImg {
    padding: 1rem;
    width: 50%;
  }
  .imgDiv {
    text-align: center;
  }
}
@media only screen and (max-width: 768px) {
  .newsImg {
    width: 100%;
    padding: 1rem;
  }
}
</style>
