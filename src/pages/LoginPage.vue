<template>
  <q-page class="row items-center justify-evenly q-px-lg">
    <div class="col q-pa-lg">
      <p class="q-pb-sm">Já possui conta? Faça seu login.</p>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          v-model="email"
          label="Digite seu email *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Digite seu email']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Digite sua senha *"
          lazy-rules
          :rules="[(val) => (val !== null && val !== '') || 'Digite sua senha']"
        />

        <div>
          <q-btn
            label="Entrar"
            class="full-width q-mb-sm"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </div>

    <div class="col q-pa-lg">
      <p>
        Ainda não possui conta?
        <a href="/#/signup" style="text-decoration: none">Faça seu cadastro.</a>
      </p>

      <h4>
        A rede social ajuda você a se conectar e compartilhar com as pessoas que
        fazem parte da sua vida.
      </h4>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useUserStore } from 'stores/user';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const userStore = useUserStore();

    const email = ref(null);
    const password = ref(null);

    return {
      email,
      password,

      async onSubmit() {
        const emailValue = email.value as unknown as string;
        const passwordValue = password.value as unknown as string;

        await userStore.login({
          email: emailValue,
          password: passwordValue,
        });
      },
    };
  },
});
</script>
