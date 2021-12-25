<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useUIStore } from '@/store/ui';
import { useTodosStore } from '@/store/todos';
import AppHeader from '@/components/AppHeader.vue';
import Sidebar from '@/components/Sidebar.vue';
import CreateTask from '@/components/CreateTask.vue';

export default defineComponent({
  components: {
    AppHeader,
    Sidebar,
    CreateTask,
  },
  setup() {
    const todosStore = useTodosStore();
    const uiStore = useUIStore();

    const { fetchTasks } = todosStore;
    const { changeTheme } = uiStore;

    const setTodosUI = () => {
      const initialTheme: string = localStorage.getItem('theme') || 'light';
      changeTheme(initialTheme);
    };

    onMounted(() => {
      setTodosUI();
      fetchTasks();
    });
  },
});
</script>

<template>
  <AppHeader />
  <div class="app-body">
    <Sidebar />
    <main class="app-content">
      <CreateTask />
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
.app-body {
  min-height: 100vh;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 250px 1fr;
    align-content: stretch;
  }
}

.app-content {
  padding: 0 20px 20px 20px;
  background-color: var(--c-background);

  @media screen and (min-width: 768px) {
    padding: 0;
    margin: 35px 40px;
  }
}
</style>
