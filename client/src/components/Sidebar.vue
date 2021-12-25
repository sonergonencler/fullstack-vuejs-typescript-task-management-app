<script lang="ts">
import { defineComponent } from 'vue';
import { useTodosStore } from '@/store/todos';
import { useUIStore } from '@/store/ui';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';

export default defineComponent({
  setup() {
    const todosStore = useTodosStore();
    const authStore = useAuthStore();
    const uiStore = useUIStore();

    const { lists } = storeToRefs(todosStore);
    const { logoutHandler } = authStore;
    const { changeTheme } = uiStore;

    return {
      logoutHandler,
      changeTheme,
      lists,
    };
  },
});
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-title">
      <router-link to="/">
        <h1>TODOS</h1>
      </router-link>
    </div>
    <nav class="sidebar-nav">
      <ul class="sidebar-list">
        <li class="sidebar-item">
          <router-link to="/" class="sidebar-link" active-class="sidebar-link--active">
            <div class="sidebar-link-inner"><img svg-inline src="../assets/house.svg" />Overview</div>
          </router-link>
        </li>
        <li class="sidebar-item">
          <button type="button" class="sidebar-link" @click="changeTheme()">
            <div class="sidebar-link-inner">
              <div class="sidebar-link-inner"><img svg-inline src="../assets/moon-stars.svg" />Lights</div>
            </div>
          </button>
        </li>
        <li class="sidebar-item">
          <button type="button" class="sidebar-link" @click="logoutHandler">
            <div class="sidebar-link-inner"><img svg-inline src="../assets/box-arrow-left.svg" />Logout</div>
          </button>
        </li>
      </ul>
      <span class="sidebar-tag">LISTS</span>
      <ul class="sidebar-list">
        <li class="sidebar-item" v-for="list in lists" :key="list">
          <router-link :to="`/` + list.toLowerCase()" class="sidebar-link" active-class="sidebar-link--active">
            <div class="sidebar-link-inner">
              {{ list }}
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style lang="scss">
.sidebar {
  display: none;
  width: 100%;
  height: 100%;
  padding: 35px 20px;
  background-color: var(--c-background);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  @media screen and (min-width: 768px) {
    display: block;
  }

  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 55px;
    padding: 0 20px;

    h1 {
      font-size: var(--size-xl);
      color: var(--c-text);
      font-weight: 600;
    }
  }

  &-nav {
    margin-top: 20px;
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
  }

  &-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 42px;
    font-size: var(--size-m);
    font-weight: 500;
    text-transform: capitalize;
    color: var(--c-text);
    border-radius: var(--b-radius);
    background-color: var(--c-background);
    padding: 0 20px;

    &-inner {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &:hover:not(.active) {
      opacity: var(--opacity);
    }

    &--active {
      color: var(--c-text-light);
      font-weight: 600;
      background-color: var(--c-primary);

      svg {
        color: var(--c-text-light);
      }
    }
  }

  &-tag {
    display: flex;
    align-items: center;
    height: 42px;
    font-size: var(--size-m);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--c-text);
    padding: 0 20px;
    opacity: 0.7;
    margin-bottom: 8px;
  }
}
</style>
