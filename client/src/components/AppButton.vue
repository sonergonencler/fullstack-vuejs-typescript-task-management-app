<script lang="ts">
import { defineComponent, PropType, ButtonHTMLAttributes } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<ButtonHTMLAttributes['type']>,
      default: 'button',
    },
    primary: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <button
    :type="type"
    class="app-button"
    :class="{ 'app-button--primary': primary, 'app-button--full': full }"
    v-if="!link"
  >
    <slot></slot>
  </button>

  <router-link class="app-button" :to="to" :class="{ 'app-button--primary': primary, 'app-button--full': full }" v-else>
    <slot></slot>
  </router-link>
</template>

<style lang="scss">
.app-button {
  display: flex;
  align-items: center;
  width: max-content;
  gap: 8px;
  height: 38px;
  background-color: var(--c-secondary);
  color: var(--c-text);
  font-size: var(--size-m);
  font-weight: 400;
  padding: 0 16px;
  border-radius: var(--b-radius);
  white-space: nowrap;

  @media screen and (min-width: 768px) {
    padding: 0 20px;
    height: 42px;
  }

  &:hover {
    opacity: var(--opacity);
  }

  &:disabled {
    opacity: 0.5;
    &:hover {
      opacity: 0.5;
    }
  }

  &--full {
    justify-content: center;
    width: 100%;
    text-transform: uppercase;
  }

  &--primary {
    background-color: var(--c-primary);
    color: var(--c-text-light);

    svg {
      color: var(--c-text-light);
    }
  }
}
</style>
