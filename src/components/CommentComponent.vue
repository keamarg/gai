<template>
  <div class="comment">
    <div class="username">{{ comment.username }}</div>
    <div class="content">{{ comment.content }}</div>

    <!-- Display replies -->
    <!-- <div v-if="comment.replies && comment.replies.length > 0">
      <ReplyComponent
        v-for="reply in comment.replies"
        :key="reply.id"
        :reply="reply"
      />
    </div> -->
  </div>
</template>

<script>
// import ReplyComponent from "./ReplyComponent.vue";

export default {
  components: {
    // ReplyComponent,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
/* Add your custom styles for comments here */
.comment {
  margin-bottom: 1rem;
  margin-left: 1rem;

  padding: 10px;
  /* border: 1px solid #ccc;
  border-radius: 4px; */
}
.username {
  font-weight: bold;
}
</style>
