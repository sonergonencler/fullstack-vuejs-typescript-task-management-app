<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Task, TaskFilters } from '@/types/Task';
import TaskItem from './TaskItem.vue';
import { storeToRefs } from 'pinia';
import { useTodosStore } from '../store/todos';

export default defineComponent({
  components: {
    TaskItem,
  },
  props: {
    filterName: {
      type: String,
      required: true,
    },
    filterType: {
      type: String as PropType<TaskFilters>,
      required: true,
    },
    tasks: {
      type: Array as PropType<Task[]>,
      required: true,
    },
  },
  setup(props) {
    const todosStore = useTodosStore();

    const { loading } = storeToRefs(todosStore);

    const filteredTasks = computed(() => {
      let tasks: Task[] = [];

      if (props.filterType === 'ACTIVE') {
        tasks = props.tasks.filter((task) => !task.isCompleted);
      }

      if (props.filterType === 'COMPLETED') {
        tasks = props.tasks.filter((task) => task.isCompleted);
      }

      if (props.filterType === 'PINNED') {
        tasks = props.tasks.filter((task) => task.isPinned);
      }

      return tasks;
    });

    return {
      filteredTasks,
      loading,
    };
  },
});
</script>

<template>
  <div class="task-list">
    <div class="task-list-heading">
      <div class="task-list-heading-left">
        <h3>{{ filterName }}</h3>
        <span v-if="!loading">{{ filteredTasks.length }}</span>
      </div>
    </div>
    <div class="task-list-body">
      <div v-if="loading">
        <div class="task-list-skeleton" />
        <div class="task-list-skeleton" />
        <div class="task-list-skeleton" />
      </div>
      <div v-else-if="!loading && filteredTasks.length > 0">
        <TaskItem
          v-for="task in filteredTasks"
          :key="task._id"
          :_id="task._id"
          :text="task.text"
          :isCompleted="task.isCompleted"
          :isPinned="task.isPinned"
        />
      </div>
      <p v-else>{{ filterName }} seems empty.</p>
    </div>
  </div>
</template>

<style lang="scss">
.task-list {
  width: 100%;
  margin-bottom: 20px;

  &-heading {
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left {
      display: flex;
      gap: 8px;

      h3 {
        font-size: var(--size-m);
        font-weight: 600;
        color: var(--c-text);
      }

      span {
        font-size: var(--size-m);
        color: var(--c-primary);
      }
    }
  }

  &-body {
    p {
      margin-top: 12px;
      font-size: var(--size-m);
      color: var(--c-text);
      opacity: 0.5;
    }
  }

  &-skeleton {
    width: 100%;
    height: 48px;
    margin-bottom: 8px;
    background-color: var(--c-skeleton);
    border-radius: var(--b-radius);
  }
}
</style>
