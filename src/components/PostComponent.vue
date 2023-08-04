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
      <input
        v-model="newComment.username"
        type="text"
        placeholder="Your name"
      />
      <input
        v-model="newComment.content"
        type="text"
        placeholder="Your comment"
      />
      <button type="submit">Add Comment</button>
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
        username: "",
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
          username: "",
          content: "",
        };

        // Fetch updated posts after successful comment submission
        this.$emit("comment-submitted"); // Emit event to notify parent that a comment has been submitted
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    },
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
</style>
