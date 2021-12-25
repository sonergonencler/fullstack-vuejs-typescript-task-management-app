import { defineStore } from 'pinia';
import { User } from '@/types/User';
import { Res } from '@/types/Api';
import router from '@/router';
import httpClient from '@/utils/client';
import { setToken } from '@/utils/storage';

interface AuthStore {
  isAuth: boolean;
  userId: string;
  username: string;
}

const initialState = {
  isAuth: false,
  userId: '',
  username: '',
} as AuthStore;

export const useAuthStore = defineStore('auth', {
  state: () => initialState,
  actions: {
    setCurrentUser(user: Partial<User>) {
      this.$patch({
        userId: user.userId,
        username: user.username,
        isAuth: true,
      });
      router.push('/');
    },
    async signupHandler(user: { username: string; password: string }) {
      try {
        const { data } = await httpClient.post<Res<User>>(`/user/signup`, user);

        setToken(data.result.token);

        this.$patch({
          userId: data.result.userId,
          username: data.result.username,
          isAuth: true,
        });

        router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    async loginHandler(user: { username: string; password: string }) {
      try {
        const { data } = await httpClient.post<Res<User>>(`/user/login`, user);

        setToken(data.result.token);

        this.$patch({
          userId: data.result.userId,
          username: data.result.username,
          isAuth: true,
        });
        router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    async logoutHandler() {
      this.$patch({
        ...initialState,
      });

      localStorage.removeItem('token');

      router.push('/login');
    },
  },
});
