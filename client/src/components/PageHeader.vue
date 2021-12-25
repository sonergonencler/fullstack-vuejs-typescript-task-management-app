<script lang="ts">
import { useUIStore } from '@/store/ui';
import { defineComponent } from 'vue';
import AppButton from './AppButton.vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const uiStore = useUIStore();

    const { openCreateTask } = uiStore;

    return {
      openCreateTask,
    };
  },
  components: {
    AppButton,
  },
});
</script>

<template>
  <header class="page-header">
    <h2>{{ title }}</h2>
    <AppButton primary @click="openCreateTask">
      <span> Create Task</span>
    </AppButton>
  </header>
</template>

<style lang="scss">
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    height: 55px;
  }

  h2 {
    font-size: var(--size-l);
    text-transform: capitalize;
    color: var(--c-text);
  }
}
</style>
