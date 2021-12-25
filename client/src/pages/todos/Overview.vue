<script lang="ts">
import { defineComponent } from 'vue';
import { useTodosStore } from '@/store/todos';
import { filters } from '@/constants/filters';
import { storeToRefs } from 'pinia';
import PageHeader from '@/components/PageHeader.vue';
import TaskList from '@/components/TaskList.vue';

export default defineComponent({
  components: {
    PageHeader,
    TaskList,
  },
  setup() {
    const todosStore = useTodosStore();

    const { tasks } = storeToRefs(todosStore);

    return {
      filters,
      tasks,
    };
  },
});
</script>

<template>
  <PageHeader title="Overview" />
  <transition name="tasks">
    <section>
      <TaskList
        v-for="(filter, index) in filters"
        :key="index"
        :filterName="filter.name"
        :filterType="filter.type"
        :tasks="tasks"
      />
    </section>
  </transition>
</template>

<style lang="scss">
@keyframes tasks-enter {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes tasks-leave {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.tasks-enter-active {
  animation: tasks-enter 350ms ease forwards;
}

.tasks-leave-active {
  animation: tasks-leave 350ms ease forwards;
}
</style>
