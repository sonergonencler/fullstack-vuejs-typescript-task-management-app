import { defineStore } from 'pinia';

type UIStore = {
  theme: string;
  showCreateTask: boolean;
  dialog: {
    show: boolean;
    title: string;
    message: string;
  };
};

export const useUIStore = defineStore('ui', {
  state: () =>
    ({
      theme: 'light',
      showCreateTask: false,
      dialog: {
        show: false,
        title: 'Error',
        message: '',
      },
    } as UIStore),
  actions: {
    changeTheme(initialTheme?: string) {
      let theme = initialTheme;

      if (!theme) {
        theme = this.theme === 'light' ? 'dark' : 'light';
      }

      const html = document.querySelector('html') as HTMLHtmlElement;
      localStorage.setItem('theme', theme);
      html.setAttribute('class', theme);

      this.theme = theme;
    },
    openCreateTask() {
      this.showCreateTask = true;
    },
    closeCreateTask() {
      this.showCreateTask = false;
    },
    openDialog(title: string, message: string) {
      this.dialog = {
        show: true,
        title,
        message,
      };
    },
    closeDialog() {
      this.dialog = {
        show: false,
        title: '',
        message: '',
      };
    },
  },
});
