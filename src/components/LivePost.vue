<template>
  <div v-if="loading" class="text">
    Henter liveblog...
    <ChatLottieWhite width="2rem" height="2rem" margin="1rem" />
  </div>

  <div v-else>
    <button @click="resetUser()" class="askButton newUserButton">
      Ny bruger
    </button>
    <p class="text">
      Velkommen til GAI-LAB livebloggen! Her kan du dele refleksioner og ideer
      omkring G-AI i løbet af hele medarbejderdagen. Du kan stille spørgsmål
      omkring Generativ AI – generelt eller i forhold til KEA og hvis du kan
      svaret til et spørgsmål, der er stillet på Livbloggen, er du meget
      velkommen til at svare.
    </p>
    <!-- Add new post form -->
    <form @submit.prevent="submitpost">
      <div class="blogHeader">
        <h2 class="text">Live blog...</h2>
      </div>
      <!-- <input v-model="newpost.username" type="text" placeholder="Dit navn" /> -->
      <div v-if="sendingPost">
        <ChatLottieWhite width="2rem" height="2rem" margin="1rem" />
      </div>
      <div v-else class="commentBar newPost">
        <input
          v-model="newPost.content"
          type="text"
          placeholder="Skriv nyt indlæg her..."
          class="inputContainer"
        />
        <button type="submit" class="askButton">Send</button>
      </div>
    </form>
    <!-- Display posts -->
    <div v-for="post in posts" :key="post.id">
      <PostComponent
        :post="post"
        @comment-submitted="fetchposts"
        :fetchposts="fetchposts"
      />
    </div>
  </div>
</template>

<script>
import PostComponent from "./PostComponent.vue";
import ChatLottieWhite from "@/components/ChatLottieWhite.vue";
import { useUserStore } from "@/store"; // Import the store

export default {
  components: {
    PostComponent,
    ChatLottieWhite,
  },
  props: {},
  data() {
    return {
      posts: [],
      newPost: {
        content: "",
      },
      loading: true,
      apiUrl_POSTSDB: process.env.VUE_APP_APIURL_POSTSDB,
      autoUpdateInterval: null,
      isPageVisible: true,
      sendingPost: false,
    };
  },

  created() {
    // Initialize newpost.username using the computed property
    this.newPost.username = useUserStore().username;
    // Fetch existing posts from your server
    this.fetchposts();
    this.autoUpdateInterval = setInterval(this.fetchposts, 10000);
    // Listen for visibility change events
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  },
  beforeUnmount() {
    clearInterval(this.autoUpdateInterval); // Clear the interval when the component is destroyed

    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  },

  methods: {
    updatePosts() {
      if (this.isPageVisible) {
        this.fetchposts();
      }
    },
    handleVisibilityChange() {
      this.isPageVisible = !document.hidden;
      if (this.isPageVisible) {
        this.updatePosts();
      }
    },
    resetUser() {
      localStorage.removeItem("name");
      localStorage.removeItem("keaId");
      this.$emit("update:show", true);
    },
    async submitpost() {
      this.sendingPost = true;
      try {
        const postData = {
          username: useUserStore().username,
          kea_id: useUserStore().keaId,
          content: this.newPost.content,
        };
        const response = await fetch(this.apiUrl_POSTSDB, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
        // console.log(postData);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        this.newPost.content = "";
        // Fetch updated posts after successful submission
        await this.fetchposts();
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    },
    // Fetch existing posts, comments, and replies from your server
    async fetchposts() {
      if (this.isPageVisible) {
        try {
          const response = await fetch(this.apiUrl_POSTSDB);

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log(data);

          // Sort the fetched posts by the created_at timestamp in descending order
          this.posts = data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          // console.log(data);
          this.loading = false;
          this.sendingPost = false;
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add your custom styles for the post page here */
.newPost {
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  /* border: 1px solid #ccc; */
  background-color: #1876f21e;
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

/* Hover styles for both classes */
.askButton:hover {
  background-color: #145cb3;
}
.newUserButton {
  color: #2e2e2e;
  background-color: #a6a6a6;

  /* visibility: hidden; */
}
.newUserButton:hover {
  color: #f9f5f5;
  background-color: #474747;

  /* visibility: hidden; */
}
.inputContainer {
  /* display: flex; */
  /* align-items: top; */
  text-align: start;
  padding: 0.5rem;
  background-color: #f0f0f0;
  border-radius: 1.5rem;
  border-style: 1px solid #ccc;
  margin-right: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  /* height: 2.5rem; */
  /* min-width: 12.5rem; */
  width: 100%;
  font-size: 1rem;
}
.blogHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.commentBar {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.text {
  color: white;
}
</style>
