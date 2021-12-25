<script lang="ts">
import { Validator } from '@/types/Form';
import { validate } from '@/utils/validators';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    placeholder: {
      type: String,
    },
    options: {
      type: Array as PropType<string[]>,
      required: true,
    },
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    isTouched: {
      type: Boolean,
      default: false,
    },
    validations: {
      type: Array as PropType<Validator[]>,
      required: true,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  emits: ['handle-form'],
  setup(props, context) {
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const inputValue = target.value;

      const { isValid, error } = validate(inputValue, props.label, props.validations);

      context.emit('handle-form', props.id, inputValue, isValid, error);
    };

    return {
      handleInput,
    };
  },
});
</script>

<template>
  <div class="form-field">
    <label v-if="!!label">
      {{ label }}
    </label>
    <div class="select-wrapper">
      <span class="select-icon" :class="{ errorSVG: isTouched && !isValid }">
        <img svg-inline src="../assets/chevron-down.svg" />
      </span>
      <select class="form-select" :class="{ error: isTouched && !isValid }" @change="handleInput" @blur="handleInput">
        <option value="" disabled :selected="value === ''">Select Category</option>
        <option v-for="option of options" :key="option" :value="option.toLowerCase()">{{ option }}</option>
      </select>
    </div>
    <p class="form-field-info error" v-if="isTouched && !isValid">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss">
.select-wrapper {
  position: relative;
  z-index: var(--index-1);
  width: 100%;
}

.select-icon {
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);

  svg {
    width: var(--size-m);
    height: var(--size-m);
  }
}

.form-select {
  position: relative;
  z-index: var(--index-1);
  width: 100%;
  height: 48px;
  font-size: var(--size-m);
  background: transparent;
  color: var(--c-text);
  border: 1px solid rgba(rgb(109, 109, 109), 0.5);
  border-radius: var(--b-radius);
  padding: 0 16px;

  &:focus {
    border: 1px solid rgba(rgb(109, 109, 109), 1);
  }
}
</style>
