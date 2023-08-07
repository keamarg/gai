<template>
  <div class="post">
    <div class="username">{{ post.username }}</div>
    <div class="content">{{ post.content }}</div>

    <!-- Display comments -->
    <div v-if="post.comments && post.comments.length > 0">
      <CommentComponent
        v-for="comment in post.comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>

    <!-- Add new comment form -->
    <form @submit.prevent="submitComment">
      <!-- <input
        v-model="newComment.username"
        type="text"
        placeholder="Your name"
      /> -->
      <input
        v-model="newComment.content"
        type="text"
        placeholder="Your comment"
      />
      <button type="submit" class="askButton">Add Comment</button>
    </form>
  </div>
</template>

<script>
import CommentComponent from "./CommentComponent.vue";

export default {
  components: {
    CommentComponent,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newComment: {
        content: "",
      },
      apiUrl_POSTSDB: process.env.VUE_APP_APIURL_POSTSDB,
    };
  },
  methods: {
    async submitComment() {
      // Send new comment to the server
      try {
        const postData = {
          username: this.newComment.username,
          content: this.newComment.content,
          post_id: this.post.id,
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

        this.newComment = {
          content: "",
        };

        // Fetch updated posts after successful comment submission
        this.$emit("comment-submitted"); // Emit event to notify parent that a comment has been submitted
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    },
  },
  created() {
    if (this.newComment.username != "") {
      this.newComment.username = localStorage.getItem("name");
    }
  },
};
</script>

<style>
/* Add your custom styles for posts here */
.post {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: rgba(255, 255, 255, 0.8);
}
.username {
  font-weight: bold;
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
</style>
