<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTodosStore } from '@/store/todos';

export default defineComponent({
  props: {
    _id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    isPinned: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const isLoading = ref(false);
    const todosStore = useTodosStore();

    const { updateTask, deleteTask } = todosStore;

    const handleUpdateStatus = async () => {
      isLoading.value = true;
      await updateTask(props._id, {
        isCompleted: !props.isCompleted,
      });
      isLoading.value = false;
    };

    const handleUpdatePinned = async () => {
      isLoading.value = true;
      await updateTask(props._id, {
        isPinned: !props.isPinned,
      });
      isLoading.value = false;
    };

    const handleDeleteTask = async () => {
      isLoading.value = true;
      await deleteTask(props._id);
      isLoading.value = false;
    };

    return {
      handleUpdateStatus,
      handleUpdatePinned,
      handleDeleteTask,
      isLoading,
    };
  },
});
</script>

<template>
  <transition name="task">
    <div class="task" :class="{ 'task--completed': isCompleted }">
      <div class="task-controls">
        <div class="task-loading" v-if="isLoading">
          <div></div>
        </div>
        <button type="button" class="task-button task-button--status" @click="handleUpdateStatus" v-else>
          <img svg-inline src="../assets/check.svg" />
        </button>
        <button type="button" class="task-button" @click="handleDeleteTask">
          <img svg-inline src="../assets/trash2.svg" />
        </button>
      </div>
      <div class="task-body">
        <span class="task-value">{{ text }}</span>
        <button type="button" class="task-button task-button--pinned" @click="handleUpdatePinned">
          <span v-if="isPinned">
            <img svg-inline src="../assets/pin-fill.svg" />
          </span>
          <span v-else>
            <img svg-inline src="../assets/pin.svg" />
          </span>
        </button>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.task {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
  background: transparent;
  border-bottom: 1px solid rgba(#333, 0.2);

  &-controls {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    background: transparent;
  }

  &-loading {
    border: 1px solid rgba(rgb(109, 109, 109), 0.5);
    border-top: 1px solid var(--c-primary);
    border-radius: 50%;
    padding: 4px;
    animation: spin 1s linear infinite;

    div {
      display: block;
      width: var(--size-m);
      height: var(--size-m);
    }
  }

  &-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 12px 12px 12px 0;
    background-color: transparent;
  }

  &-value {
    font-size: var(--size-m);
    color: var(--c-text);
    overflow: hidden;
    width: 100%;
    line-height: 1.5rem;
    word-break: break-all;
  }

  &-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    background-color: transparent;
    border-radius: 50%;

    &--status {
      border: 1px solid rgba(rgb(109, 109, 109), 0.5);

      svg {
        opacity: 0.5;
      }

      &:hover {
        opacity: var(--opacity);

        svg {
          opacity: 1;
        }
      }
    }

    &--pinned {
      padding: 0;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    &:hover {
      opacity: var(--opacity);
    }
  }

  &--completed {
    .task-button--status {
      background-color: var(--c-primary);

      svg {
        opacity: 1;
        color: var(--c-text-light);
      }
    }

    .task-value {
      opacity: 0.5;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
