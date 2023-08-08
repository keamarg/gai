<template>
  <div class="comment">
    <div class="username">{{ comment.username }}</div>
    <div class="content">{{ comment.content }}</div>
  </div>
</template>

<script>
export default {
  components: {},
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
