<template>
  <div v-if="loading">Henter liveblog...</div>
  <div v-else>
    <!-- Add new post form -->
    <form @submit.prevent="submitpost">
      <button @click="resetUser()" class="askButton newUserButton">
        Ny bruger
      </button>
      <div class="blogHeader">
        <h2>Live blog...</h2>
      </div>
      <!-- <input v-model="newpost.username" type="text" placeholder="Dit navn" /> -->
      <div class="commentBar">
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
      <PostComponent :post="post" @comment-submitted="fetchposts" />
    </div>
  </div>
</template>

<script>
import PostComponent from "./PostComponent.vue";
import { useUserStore } from "@/store"; // Import the store

export default {
  components: {
    PostComponent,
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
    };
  },

  created() {
    // Initialize newpost.username using the computed property
    this.newPost.username = useUserStore().username;
    // Fetch existing posts from your server
    this.fetchposts();
  },
  methods: {
    resetUser() {
      localStorage.removeItem("name");
      localStorage.removeItem("keaId");
      this.$emit("update:show", true);
    },
    async submitpost() {
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
    // Fetch existing posts, comments, and replies from your server
    async fetchposts() {
      try {
        const response = await fetch(this.apiUrl_POSTSDB);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Sort the fetched posts by the created_at timestamp in descending order
        this.posts = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        // console.log(data);
        this.loading = false;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your custom styles for the post page here */
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
  color: #f9f5f5;
  background-color: #a6a6a6;

  /* visibility: hidden; */
}
.newUserButton:hover {
  color: #cdcdcd;
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
  min-width: 12.5rem;
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
</style>
