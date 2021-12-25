<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useUIStore } from '../store/ui';
import AppButton from './AppButton.vue';

export default defineComponent({
  setup() {
    const uiStore = useUIStore();

    return {
      show: computed(() => uiStore.dialog.show),
      title: computed(() => uiStore.dialog.title),
      message: computed(() => uiStore.dialog.message),
      closeDialog: () => uiStore.closeDialog(),
    };
  },
  components: {
    AppButton,
  },
});
</script>

<template>
  <teleport to="#modals">
    <transition name="dialog">
      <div class="app-dialog" @click="closeDialog" v-if="show">
        <div class="app-dialog-content">
          <h2>{{ title }}</h2>
          <p>{{ message }}</p>
          <AppButton @click="closeDialog">Close</AppButton>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss">
.app-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: var(--index-6);
  background-color: rgba(#333, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    color: var(--c-text);
    font-size: var(--size-l);
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
    color: var(--c-text);
  }

  &-content {
    max-width: 450px;
    width: 80%;
    background-color: var(--c-background);
    padding: 20px;
    border-radius: var(--b-radius);
    box-shadow: 0px 2px 4px rgba(#333, 0.2);
  }
}

@keyframes dialog-enter {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes dialog-leave {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.dialog-enter-active {
  animation: dialog-enter 350ms ease forwards;
}

.dialog-leave-active {
  animation: dialog-leave 350ms ease forwards;
}
</style>
