<template>
  <form class="form">
    <slot></slot>
  </form>
</template>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  &-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    label {
      display: flex;
      align-items: flex-start;
      color: var(--c-text);
    }

    &-info {
      font-size: var(--size-s);
    }
  }
}
</style>
