<template>
  <div class="card mb-3 mt-3">
    <div class="card-body">
      <h4 class="card-title">{{ card.title }}</h4>
      <h6 class="card-subtitle mb-2 text-muted">{{ card.subtitle }}</h6>
      <p class="card-text">
        {{ card.body }}
      </p>
      <div class="card-actions">
        <div class="card-actions__edit">
          <slot>
            <router-link
                class="btn btn-success"
                :to="{ name: 'edit-post', params: { id: card.id } }"
            >
              Edit
            </router-link>
          </slot>
        </div>
        <div class="card-actions__delete">
          <slot>
            <button class="btn btn-danger" @click="$emit('deleted')">
              Delete
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.card-actions {
  display: flex;

  &__edit {
    margin-right: 5px;
  }
}
</style>
