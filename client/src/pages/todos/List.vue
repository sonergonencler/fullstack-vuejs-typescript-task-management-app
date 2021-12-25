<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
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
    const route = useRoute();
    const todosStore = useTodosStore();

    const { tasks } = storeToRefs(todosStore);

    const list = computed(() => route.params.list) as ComputedRef<string>;

    const tasksInList = computed(() => tasks.value.filter((task) => task.list === list.value));

    return {
      tasksInList,
      list,
      filters,
    };
  },
});
</script>

<template>
  <PageHeader :title="list" />
  <transition name="tasks">
    <section>
      <TaskList
        v-for="(filter, index) in filters"
        :key="index"
        :filterName="filter.name"
        :filterType="filter.type"
        :tasks="tasksInList"
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
