<template>
  <div class="reply">
    <div class="username">{{ reply.username }}</div>
    <div class="content">{{ reply.content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    reply: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
/* Add your custom styles for replies here */
.reply {
  margin-bottom: 10px;
  padding: 10px;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
}
.username {
  font-weight: bold;
}
</style>
