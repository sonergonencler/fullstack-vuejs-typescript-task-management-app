<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  setup() {
    onMounted(() => {
      const html = document.querySelector('html') as HTMLHtmlElement;
      html.setAttribute('class', 'light');
    });
  },
});
</script>

<template>
  <router-view />
</template>

<style lang="scss">
.auth {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-height: 100vh;
  background-color: var(--c-background);

  @media screen and (min-width: 768px) {
    justify-content: center;
    background-color: var(--c-primary);
  }
}

.auth-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  background-color: var(--c-background);
  padding: 40px;
  border-radius: var(--b-radius);

  @media screen and (min-width: 768px) {
    width: 350px;
    box-shadow: 0px 2px 4px rgba(#333, 0.2);
  }
}

.auth-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-family: 'Lato', sans-serif;
    font-size: var(--size-l);
    color: var(--c-text);
  }

  h2 {
    font-size: var(--size-m);
    color: var(--c-text);
    font-weight: 300;
  }
}
</style>
