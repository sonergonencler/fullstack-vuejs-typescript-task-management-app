<script lang="ts">
import { defineComponent } from 'vue';
import { validators } from '@/utils/validators';
import { useAuthStore } from '@/store/auth';
import useForm from '@/hooks/useForm';
import AppForm from '@/components/AppForm.vue';
import AppInput from '@/components/AppInput.vue';
import AppButton from '@/components/AppButton.vue';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();

    const { loginHandler } = authStore;

    const { inputs, isValid, handleForm, handleSubmit } = useForm(
      {
        username: {
          id: 'username',
          value: '',
          isValid: false,
          isTouched: false,
          errorMessage: '',
        },
        password: {
          id: 'password',
          value: '',
          isValid: false,
          isTouched: false,
          errorMessage: '',
        },
      },
      async ({ data, resetForm }) => {
        await loginHandler(data);
        resetForm();
      }
    );
    return {
      inputs,
      isValid,
      handleForm,
      handleSubmit,
      validators,
    };
  },
  components: {
    AppForm,
    AppInput,
    AppButton,
  },
});
</script>

<template>
  <div class="auth">
    <div class="auth-content">
      <div class="auth-title">
        <h1>TODOS</h1>
        <h2>Login</h2>
      </div>
      <AppForm @submit.prevent="handleSubmit">
        <AppInput
          type="text"
          label="Username"
          placeholder="enter your username"
          :id="inputs.username.id"
          :value="inputs.username.value"
          :isValid="inputs.username.isValid"
          :isTouched="inputs.username.isTouched"
          :errorMessage="inputs.username.errorMessage"
          :validations="[
            validators.notEmpty(),
            validators.isPattern(/^[a-zA-Z0-9_.-]+$/),
            validators.minLength(5),
            validators.maxLength(15),
          ]"
          @handle-form="handleForm"
        />
        <AppInput
          type="password"
          label="Password"
          placeholder="enter your password"
          :id="inputs.password.id"
          :value="inputs.password.value"
          :isValid="inputs.password.isValid"
          :isTouched="inputs.password.isTouched"
          :errorMessage="inputs.password.errorMessage"
          :validations="[
            validators.notEmpty(),
            validators.isPattern(/^[a-zA-Z0-9_.-]+$/),
            validators.minLength(8),
            validators.maxLength(50),
          ]"
          @handle-form="handleForm"
        />
        <div class="form-field">
          <AppButton type="submit" primary full :disabled="!isValid">Login</AppButton>
          <AppButton type="button" to="/signup" link full>Signup</AppButton>
        </div>
      </AppForm>
    </div>
  </div>
</template>
