import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { Notify } from 'quasar';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    userId: null,
  }),
  getters: {
    getToken: (state) => state.token,
  },
  actions: {
    async login({ email, password }: { email: string; password: string }) {
      try {
        const output = await api.post('/user/login', {
          email,
          password,
        });

        const { token, userId } = output.data.data;
        this.token = token;
        this.userId = userId;

        Notify.create({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Login realizado com sucesso! Redirecionando...',
        });

        this.router.push(`user/${userId}`);
      } catch {
        Notify.create({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Verifique o email e senha digitados',
        });
      }
    },
    async signup({
      email,
      firstName,
      lastName,
      birthday,
      gender,
      password,
      relationshipStatus,
    }: {
      email: string;
      firstName: string;
      lastName: string;
      birthday: string;
      gender: string;
      password: string;
      relationshipStatus: string;
    }) {
      try {
        await api.post('/user/', {
          email,
          firstName,
          lastName,
          birthday,
          gender,
          password,
          relationshipStatus,
        });

        Notify.create({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Cadastro realizado com sucesso! Redirecionando...',
        });
      } catch {
        Notify.create({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message:
            'Não foi possivel se cadastrar agora, tente novamente mais tarde.',
        });
      }
    },
  },
});
