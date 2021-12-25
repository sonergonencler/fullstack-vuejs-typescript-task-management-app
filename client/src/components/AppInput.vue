<script lang="ts">
import { Validator } from '@/types/Form';
import { validate } from '@/utils/validators';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
    },
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
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
    <input
      :type="type"
      class="form-input"
      :class="{ error: isTouched && !isValid }"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
      @blur="handleInput"
    />
    <p class="form-field-info error" v-if="isTouched && !isValid">{{ errorMessage }}</p>
  </div>
</template>

<style lang="scss">
.form-input {
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
