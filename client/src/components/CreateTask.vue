<script lang="ts">
import { defineComponent } from 'vue';
import AppSelect from './AppSelect.vue';
import AppForm from './AppForm.vue';
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';
import { useTodosStore } from '@/store/todos';
import useForm from '@/hooks/useForm';
import { Task } from '@/types/Task';
import { validators } from '@/utils/validators';
import { useUIStore } from '@/store/ui';
import { storeToRefs } from 'pinia';

export default defineComponent({
  components: {
    AppSelect,
    AppForm,
    AppButton,
    AppInput,
  },
  setup() {
    const uiStore = useUIStore();
    const todosStore = useTodosStore();

    const { lists } = storeToRefs(todosStore);
    const { showCreateTask } = storeToRefs(uiStore);
    const { createTask } = todosStore;
    const { closeCreateTask } = uiStore;

    const { inputs, isValid, handleForm, handleSubmit } = useForm(
      {
        list: {
          id: 'list',
          value: '',
          isValid: false,
          isTouched: false,
          errorMessage: '',
        },
        text: {
          id: 'text',
          value: '',
          isValid: false,
          isTouched: false,
          errorMessage: '',
        },
      },
      async ({ data, resetForm }) => {
        const task: Task = {
          ...data,
          isCompleted: false,
          isPinned: false,
        };
        await createTask(task);
        closeCreateTask();
        resetForm();
      }
    );

    return {
      inputs,
      isValid,
      validators,
      showCreateTask,
      handleForm,
      handleSubmit,
      closeCreateTask,
      lists,
    };
  },
});
</script>

<template>
  <teleport to="#modals">
    <div v-if="showCreateTask">
      <div class="task-form-overlay" @click="closeCreateTask"></div>
      <div>
        <div class="task-form">
          <div class="task-form-heading">
            <h3>Create Task</h3>
          </div>
          <AppForm @submit.prevent="handleSubmit">
            <AppSelect
              :options="lists"
              label="Select List"
              :id="inputs.list.id"
              :value="inputs.list.value"
              :isValid="inputs.list.isValid"
              :isTouched="inputs.list.isTouched"
              :errorMessage="inputs.list.errorMessage"
              :validations="[validators.notEmpty()]"
              @handle-form="handleForm"
            />
            <AppInput
              type="text"
              label="Task"
              placeholder="read book..."
              :id="inputs.text.id"
              :value="inputs.text.value"
              :isValid="inputs.text.isValid"
              :isTouched="inputs.text.isTouched"
              :errorMessage="inputs.text.errorMessage"
              :validations="[validators.notEmpty(), validators.minLength(5), validators.maxLength(30)]"
              @handle-form="handleForm"
            />
            <div class="form-field">
              <AppButton type="submit" full primary :disabled="!isValid">Save</AppButton>
              <AppButton type="button" full @click="closeCreateTask">Close</AppButton>
            </div>
          </AppForm>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss">
.task-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--index-4);
  width: 100vw;
  height: 100vh;
  background-color: rgba(#333, 0.8);
}

.task-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: var(--index-5);
  background-color: var(--c-background);
  padding: 20px;
  border-radius: var(--b-radius);
  box-shadow: 0px 2px 4px rgba(#333, 0.2);
  max-width: 350px;
  width: 85%;
  overflow-y: auto;

  &-heading {
    margin-bottom: 20px;
  }
}
</style>
