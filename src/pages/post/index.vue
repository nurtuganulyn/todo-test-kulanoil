<template>
  <div class="post-list" v-if="posts.length > 0">
        <Card
            v-for="post in posts"
            :key="post.id"
            :card="post"
            @deleted="onDeleted(post.id)"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Card from "../../components/Card";

export default {
  name: "index",
  components: {Card},
  methods: {
    ...mapActions({
      fetchPosts: "post/fetchPosts",
      deletePost: "post/deletePost",
    }),
    async onDeleted(id) {
      await this.deletePost(id);
    },
  },
  computed: {
    ...mapGetters({
      isLoading: "post/isLoading",
      posts: "post/posts",
    }),
  },
  async created() {
    await this.fetchPosts();
  },
};
</script>

<style lang="scss" scoped>
.card-list{
  margin-left: 20px;
}
</style>
