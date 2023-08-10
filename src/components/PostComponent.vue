<template>
  <div class="post">
    <div class="gptBar">
      <div class="username">{{ post.username }} ({{ post.kea_id }})</div>
      <!-- <button type="submit" class="askButton gptButton">Spørg ChatGPT</button> -->
    </div>
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
      <div v-if="sendingComment">
        <ChatLottie width="2rem" height="2rem" margin="1rem" />
      </div>
      <div v-else class="commentBar">
        <input
          v-model="newComment.content"
          type="text"
          placeholder="Skriv kommentar her..."
          class="inputContainer"
        />
        <button type="submit" class="askButton">Send</button>
      </div>
    </form>
  </div>
</template>

<script>
import CommentComponent from "./CommentComponent.vue";
import { useUserStore } from "@/store";
import ChatLottie from "@/components/ChatLottie.vue";

export default {
  components: {
    CommentComponent,
    ChatLottie,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
    fetchposts: Function,
  },
  data() {
    return {
      newComment: {
        content: "",
      },
      apiUrl_POSTSDB: process.env.VUE_APP_APIURL_POSTSDB,
      sendingComment: false,
    };
  },
  methods: {
    async submitComment() {
      // Send new comment to the server
      this.sendingComment = true;
      try {
        const postData = {
          username: useUserStore().username,
          kea_id: useUserStore().keaId,
          content: this.newComment.content,
          post_id: this.post.id,
        };
        // console.log(postData);
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

        this.newComment.content = "";

        await this.fetchposts();
        this.sendingComment = false;
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    },
  },
  created() {
    // Initialize newpost.username using the computed property
    // this.newComment.username = useUserStore().setUsername(this.username);
    // if (this.newComment.username != "") {
    // this.newComment.username = localStorage.getItem("name");
    // }
  },
};
</script>

<style scoped>
/* Add your custom styles for posts here */
.post {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  /* border: 1px solid #ccc; */
  background-color: white;
}
.username {
  font-size: 1.2rem;
  font-weight: bold;
}
.content {
  margin-bottom: 1rem;
  white-space: normal;
  word-wrap: break-word;
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
.inputContainer {
  /* display: flex; */
  /* align-items: top; */
  text-align: start;
  padding: 0.5rem;
  background-color: #f0f0f0;
  border-radius: 1.5rem;
  border-style: 1px solid #ccc;
  margin-right: 1rem;
  margin-left: 1.5rem;
  height: 2.5rem;
  /* width: 20rem; */
}
.commentBar {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.gptBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.gptButton {
  color: #f9f5f5;
  background-color: #e03030bc;

  /* visibility: hidden; */
}
.gptButton:hover {
  color: #cdcdcd;
  background-color: #474747;

  /* visibility: hidden; */
}
</style>
