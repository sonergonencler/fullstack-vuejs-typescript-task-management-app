import { defineStore } from 'pinia';
import { Task } from '@/types/Task';
import { Res } from '@/types/Api';
import { wait } from '@/utils/wait';
import httpClient from '@/utils/client';

interface TodosStore {
  tasks: Task[];
  lists: string[];
  loading: boolean;
}

const initialState = {
  tasks: [],
  lists: ['Projects', 'Personal', 'Travel', 'Work', 'Study'],
  loading: true,
} as TodosStore;

export const useTodosStore = defineStore('todos', {
  state: () => initialState,
  actions: {
    async fetchTasks() {
      this.loading = true;

      try {
        const { data } = await httpClient.get<Res<Task[]>>('/tasks');
        await wait(500);
        
        this.tasks = data.result;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    async createTask(task: Omit<Task, '_id'>) {
      try {
        const { data } = await httpClient.post<Res<Task>>(`/tasks`, task);

        this.tasks.push(data.result);
      } catch (err) {
        console.log(err);
      }
    },
    async updateTask(taskId: string, updatedData: Partial<Task>) {
      try {
        const { data } = await httpClient.patch<Res<Task>>(`/tasks/${taskId}`, updatedData);

        await wait(1000);

        const taskIndex = this.tasks.findIndex((taskItem) => taskItem._id === data.result._id);
        this.tasks[taskIndex] = data.result;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteTask(taskId: string) {
      try {
        const { data } = await httpClient.delete<Res<Task>>(`/tasks/${taskId}`);

        await wait(1000);

        this.tasks = this.tasks.filter((task) => task._id !== data.result._id);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
