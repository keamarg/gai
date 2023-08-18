<template>
  <div class="comment">
    <div class="username">
      {{ comment.username }} ({{ this.getTime(comment.created_at) }})
    </div>
    <!-- <div class="content">{{ comment.content }}</div> -->
    <div v-linkify class="content" v-html="comment.content"></div>
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
    getTime: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style>
/* Add your custom styles for comments here */
.comment {
  /* margin-bottom: 0.5rem; */
  margin-left: 1rem;
  padding: 0.5rem;
  /* border: 1px solid #ccc;
  border-radius: 4px; */
}
.username {
  font-weight: bold;
}
.content {
  margin-top: 0.3rem;
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.4rem;
}
/* Default link styles */
content a {
  text-decoration: underline;
  font-weight: 100;
  color: blue;
}

.content a:hover {
  text-decoration: none;
  font-weight: 400;
  color: red;
}

.content a:visited {
  color: purple;
}

.content a:active {
  /* Define styles for the active state, if desired */
}

.content a:focus {
  outline: 2px solid orange;
}
</style>
