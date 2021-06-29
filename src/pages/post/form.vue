<template>
  <div>
    <form>
      <fieldset>
        <div class="form-group">
          <label for="title" class="col-sm-2 col-form-label">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            aria-describedby="title"
            placeholder="Enter post title"
            v-model="post.title"
          />
        </div>
        <div class="form-group">
          <label for="body" class="form-label mt-4">Title</label>
          <textarea
            class="form-control"
            id="body"
            v-model="post.content"
          ></textarea>
        </div>
        <button
          type="button"
          class="btn btn-primary mt-2"
          @click="onClick"
        >
          {{ isEditButton ? "Edit" : "Add" }}
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { getPostById } from "@/api/post";
import { mapActions } from "vuex";

export default {
  name: "form.vue",
  data() {
    return {
      isEditButton: null,
      post: {
        title: "",
        content: "",
      },
    };
  },
  async created() {
    this.isEditButton = this.$route.meta.isEditButton;
    if (this.isEditButton) {
      const { data } = await getPostById(this.$route.params.id);
      this.post = {
        title: data.title,
        content: data.body,
      };
    }
  },
  methods: {
    ...mapActions({
      addPost: "post/addPost",
      updatePost: "post/editPost",
    }),
    async onClick() {
      if (!this.isEditButton) {
        await this.addPost({
          title: this.post.title,
          body: this.post.content,
          userId: 1,
        });
        this.post = {
          title: "",
          content: "",
        };
      } else {
        await this.updatePost({
          id: this.$route.params.id,
          title: this.post.title,
          body: this.post.content,
          userId: 1,
        });
        await this.$router.push({name: "posts"});
      }
    },
  },
};
</script>

<style scoped>
</style>
