<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { useUIStore } from '@/store/ui';
import { useTodosStore } from '@/store/todos';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const menuIsOpen = ref(false);
    const route = useRoute();
    const authStore = useAuthStore();
    const uiStore = useUIStore();
    const todosStore = useTodosStore();

    const { lists } = storeToRefs(todosStore);
    const { changeTheme } = uiStore;
    const { logoutHandler } = authStore;

    const toggleMenu = () => {
      menuIsOpen.value = !menuIsOpen.value;
    };

    const path = computed(() => route.path);

    watch(path, () => {
      if (!menuIsOpen.value) return;
      menuIsOpen.value = false;
    });

    return {
      menuIsOpen,
      lists,
      toggleMenu,
      changeTheme,
      logoutHandler,
    };
  },
});
</script>

<template>
  <header class="app-header">
    <div class="app-header-content">
      <div class="app-header-title">
        <router-link to="/"><h1>TODOS</h1></router-link>
      </div>
      <button type="button" class="app-header-toggler" @click="toggleMenu">
        <img svg-inline src="../assets/list.svg" />
      </button>
    </div>
    <teleport to="#modals">
      <transition name="menu">
        <div class="app-header-menu" v-if="menuIsOpen">
          <div class="app-header-content">
            <div class="app-header-title">
              <router-link to="/"><h1>TODOS</h1></router-link>
            </div>
            <button type="button" class="app-header-toggler app-header-toggler--fixed" @click="toggleMenu">
              <img svg-inline src="../assets/list.svg" />
            </button>
          </div>
          <nav class="app-header-nav">
            <ul class="app-header-list">
              <li class="app-header-item">
                <router-link to="/" class="app-header-link" active-class="app-header-link--active">
                  <div class="app-header-link-inner"><img svg-inline src="../assets/house.svg" />Overview</div>
                </router-link>
              </li>
              <li class="app-header-item">
                <button type="button" class="app-header-link" @click="changeTheme()">
                  <div class="app-header-link-inner">
                    <div class="app-header-link-inner"><img svg-inline src="../assets/moon-stars.svg" />Lights</div>
                  </div>
                </button>
              </li>
              <li class="app-header-item">
                <button type="button" class="app-header-link" @click="logoutHandler">
                  <div class="app-header-link-inner"><img svg-inline src="../assets/box-arrow-left.svg" />Logout</div>
                </button>
              </li>
            </ul>
            <span class="app-header-tag">LISTS</span>
            <ul class="app-header-list">
              <li class="app-header-item" v-for="list in lists" :key="list">
                <router-link
                  :to="`/` + list.toLowerCase()"
                  class="app-header-link"
                  active-class="app-header-link--active"
                >
                  <div class="app-header-link-inner">
                    {{ list }}
                  </div>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </transition>
    </teleport>
  </header>
</template>

<style lang="scss">
.app-header {
  width: 100%;
  background-color: var(--c-background);

  @media screen and (min-width: 768px) {
    display: none;
  }

  &-content {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  &-title {
    display: flex;
    align-items: center;
    height: 100%;

    h1 {
      font-size: var(--size-xl);
      color: var(--c-text);
      font-weight: 600;
    }
  }

  &-toggler {
    position: relative;
    left: 12px;
    display: flex;
    align-items: center;
    background-color: transparent;
    padding: 12px;
    border-radius: var(--b-radius);

    svg {
      width: var(--size-l);
      height: var(--size-l);
      color: var(--c-text);
    }
  }

  &-menu {
    position: fixed;
    z-index: var(--index-7);
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--c-background);
    overflow: hidden;
  }

  &-nav {
    background-color: var(--c-background);
  }

  &-list {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
  }

  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  &-link {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
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
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 42px;
    font-size: var(--size-m);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--c-text);
    padding: 0 40px;
    opacity: 0.7;
    margin-bottom: 8px;
  }
}

@keyframes menu-enter {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes menu-leave {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.menu-enter-active {
  animation: menu-enter 350ms ease forwards;
}

.menu-leave-active {
  animation: menu-leave 350ms ease forwards;
}
</style>
