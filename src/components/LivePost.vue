<template>
  <button @click="resetUser()" class="askButton">Reset user</button>
  <div v-if="loading">Henter liveblog...</div>
  <div v-else>
    <!-- Add new post form -->
    <form @submit.prevent="submitpost">
      <!-- <input v-model="newpost.username" type="text" placeholder="Dit navn" /> -->
      <input
        v-model="newPost.content"
        type="text"
        placeholder="Skriv ny post her..."
        class="inputContainer"
      />
      <button type="submit" class="askButton">Send</button>
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
      try {
        const response = await fetch(this.apiUrl_POSTSDB);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        this.posts = data;
        console.log(this.posts);
        this.loading = false;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
  },
};
</script>

<style>
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
  height: 2.5rem;
  width: 20rem;
}
</style>
