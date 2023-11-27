<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/img/KEA_logo_DK_Web_gai.jpg" class="headerLogo" />
      <h1>GAI eventkalender</h1>
    </div>
    <p>
      Her kan du finde relevante events om AI. Skriv til
      <a href="mailto:saro@kea.dk?subject=GAI event">Sarah</a> eller
      <a href="mailto:marg@kea.dk?subject=GAI event">Martin</a> hvis du vil høre
      mere, eller er interesseret i at deltage...
    </p>
    <div class="innercontainer">
      <CardGroup />
    </div>
  </div>
</template>
<script>
import CardGroup from "@/components/CardGroup.vue";
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: { CardGroup },
};
</script>

<style scoped>
.container {
  /* width: 90vw;
  height: 90vh; */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  /* display: flex; */
  /* flex-direction: column; */
  /* overflow: hidden; */
  font-family: "Roboto", sans-serif;
  padding: 2rem;
}
.innercontainer {
  display: flex;
  flex-direction: row;
}
.header {
  display: flex;
  align-items: center;
}
.infobox {
  /* display: flex; */
  /* align-items: center; */
  margin-bottom: 2rem;
  margin-top: 3rem;
  /* border: 1px solid gray; */
  /* height: 22rem; */
  margin-left: auto;
  /* float: right; */
  padding: 1rem;
  background-color: #1877f2;
  color: white;
}
.contentbox {
  /* display: flex; */
  flex-direction: column;
  margin-right: 1rem;
  /* width: 70%; */
}
.headerLogo {
  width: 4rem;
  margin-right: 1rem;
}

.newsImg {
  /* padding: 1rem 0rem 1rem 0rem; */
  width: 100%;
}
.podcastImg {
  height: 1rem;
  width: 1rem;
  margin-right: 1rem;
}
/* .imgDiv a {
  display: flex;
  align-items: center;
} */
.imgDiv {
  padding: 1rem 2rem 1rem 1rem;
}
.podImgDiv a {
  /* display: flex; */
  align-items: center;
  overflow: hidden;
}

.podImgLink {
  color: white;
  margin-top: 1rem;
  display: inline-block;
}
.podImgLink:visited {
  color: white;
}
.podImgLink:hover {
  color: darkgray;
}

li {
  margin-bottom: 1rem;
}
h2 {
  margin-bottom: 0rem;
}
h3 {
  margin-top: 3rem;
  margin-bottom: 0rem;
}
a {
  color: gray;
  margin-top: 1rem;
  display: inline-block;
}
a:visited {
  color: gray;
}
a:hover {
  color: darkgray;
}
ol {
  padding-inline-start: 1rem;
}
p {
  margin-top: 1rem;
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .contentbox {
    width: 70%;
  }
  /* .imgDiv {
    text-align: center;
  } */
}
@media only screen and (max-width: 768px) {
  /* .imgDiv {
    width: 100%;
    padding: 1rem;
  } */

  .innercontainer {
    flex-direction: column;
    margin-top: 3rem;
  }
}
</style>
