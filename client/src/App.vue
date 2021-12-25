<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useAuthStore } from './store/auth';
import AppDialog from './components/AppDialog.vue';
import { getAuthInfo } from './utils/getAuthInfo';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();

    const { setCurrentUser } = authStore;

    onMounted(() => {
      const { isValid, payload } = getAuthInfo();

      if (!isValid) return;

      setCurrentUser(payload);
    });
  },
  components: {
    AppDialog,
  },
});
</script>

<template>
  <AppDialog />
  <router-view />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Poppins:wght@300;400;500;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --size-s: 0.8rem;
  --size-m: 1rem;
  --size-l: 1.4rem;
  --size-xl: 1.5rem;
  --b-radius: 7px;
  --opacity: 0.7;
  --index-1: 1000;
  --index-2: 2000;
  --index-3: 3000;
  --index-4: 4000;
  --index-5: 5000;
  --index-6: 6000;
  --index-7: 7000;
}

.dark:root {
  --c-primary: #158566;
  --c-secondary: #333;
  --c-background: #121212;
  --c-background-var: #333;
  --c-text: #fff;
  --c-text-light: #fff;
  --c-skeleton: #333;
}

.light:root {
  --c-primary: #158566;
  --c-secondary: #4c306010;
  --c-background: #ffffff;
  --c-background-var: #f7f7f7;
  --c-text: #333;
  --c-text-light: #fff;
  --c-skeleton: #f7f7f7;
}

html {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
}

body {
  background-color: var(--c-background);
}

li {
  list-style: none;
}

a {
  display: inline-block;
  text-decoration: none;
}

input {
  font-family: inherit;
  font-size: inherit;
  border: none;
  outline: none;
  cursor: inherit;

  &::placeholder {
    font-family: inherit;
    font-size: inherit;
  }
}

select {
  appearance: none;
  background-color: transparent;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  border: none;
  line-height: inherit;
  outline: none;
  cursor: pointer;
}

option {
  background-color: var(--c-background);
}

select::-ms-expand {
  display: none;
}

button {
  font-size: var(--size-medium);
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  border: 0;
  cursor: pointer;
}

svg {
  width: var(--size-m);
  height: var(--size-m);
  color: var(--c-text);
  outline: none;
}

.form-input.error,
.form-select.error,
.datepicker-input.error {
  color: #e74c3c;
  border: 1px solid rgba(#e74c3c, 0.5);

  &:focus {
    border: 1px solid rgba(#e74c3c, 0.5);
  }

  &::placeholder {
    color: #e74c3c;
  }
}

.errorSVG {
  svg {
    color: #e74c3c;
  }
}

.error {
  color: #e74c3c;
}
</style>
