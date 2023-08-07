<template>
  <button @click="resetUser()" class="askButton">Reset user</button>
  <div v-if="loading">Henter liveblog...</div>
  <div v-else>
    <!-- Display posts -->
    <div v-for="post in posts" :key="post.id">
      <PostComponent :post="post" @comment-submitted="fetchposts" />
    </div>

    <!-- Add new post form -->
    <form @submit.prevent="submitpost">
      <input v-model="newpost.username" type="text" placeholder="Dit navn" />
      <input
        v-model="newpost.content"
        type="text"
        placeholder="Din kommentar"
      />
      <button type="submit" class="askButton">Send</button>
    </form>
  </div>
</template>

<script>
import PostComponent from "./PostComponent.vue";

export default {
  components: {
    PostComponent,
  },
  data() {
    return {
      posts: [],
      newpost: {
        username: "",
        content: "",
      },
      loading: true,
      apiUrl_POSTSDB: process.env.VUE_APP_APIURL_POSTSDB,
    };
  },
  created() {
    // Fetch existing posts from your server
    this.fetchposts();
  },
  methods: {
    resetUser() {
      localStorage.removeItem("name");
      localStorage.removeItem("keaId");
      location.reload();
    },
    submitpost() {
      // console.log(this.newpost);
      // Send new post to your server
      fetch(this.apiUrl_POSTSDB, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newpost),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          this.newpost = {
            // username: "",
            content: "",
          };
          // Fetch updated posts after successful submission
          this.fetchposts();
        })
        .catch((error) => {
          console.error("Error submitting post:", error);
        });
    },
    fetchposts() {
      // Fetch existing posts, comments, and replies from your server
      fetch(this.apiUrl_POSTSDB)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.posts = data;
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
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
</style>
