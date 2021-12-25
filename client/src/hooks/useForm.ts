import { computed, reactive } from 'vue';
import { Form, InputsMap } from '@/types/Form';

const useForm = (initialInputs: InputsMap, onSubmit: (results: { data: any; resetForm: () => void }) => void) => {
  const formState = reactive<Form>({
    isValid: false,
    inputs: initialInputs,
  });

  const handleForm = (inputId: string, inputValue: string, inputIsValid: boolean, inputError: string) => {
    let formIsValid = true;

    for (const input in formState.inputs) {
      if (input === inputId) {
        formIsValid = formIsValid && inputIsValid;
      } else {
        formIsValid = formIsValid && formState.inputs[input].isValid;
      }
    }
    Object.assign(formState, {
      isValid: formIsValid,
      inputs: {
        ...formState.inputs,
        [inputId]: {
          ...formState.inputs[inputId],
          value: inputValue,
          isValid: inputIsValid,
          errorMessage: inputError,
          isTouched: true,
        },
      },
    });

  };

  const resetForm = () => {
    Object.assign(formState, {
      isValid: false,
      inputs: initialInputs,
    });
  };

  const handleSubmit = () => {
    let data = {};

    for (const input in formState.inputs) {
      data = {
        ...data,
        [input]: formState.inputs[input].value,
      };
    }

    onSubmit({ data, resetForm });
  };

  return {
    inputs: computed(() => formState.inputs),
    isValid: computed(() => formState.isValid),
    handleForm,
    handleSubmit,
  };
};

export default useForm;
