<template>
  <div class="row justify-center">
    <q-page class="q-pa-md" style="width: 100%; max-width: 600px">
      <p class="q-pb-sm">Faça seu cadastro, é grátis e sempre será!</p>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          type="email"
          v-model="email"
          label="Digite seu email *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor, digite algo',
          ]"
        />

        <q-input
          filled
          v-model="name"
          label="Digite seu nome *"
          hint="Nome e sobrenome"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor, digite algo',
          ]"
        />

        <q-input
          filled
          type="date"
          v-model="birthday"
          label="Data de nascimento *"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Por favor, digite sua data de nascimento',
            (val) =>
              new Date(val).getFullYear() < minimumYear ||
              'Por favor, digite uma data de nascimento real',
          ]"
        />

        <q-select v-model="gender" :options="genderOptions" label="Gênero" />

        <q-select
          v-model="relationshipStatus"
          :options="relationshipStatuses"
          label="Estado de relacionamento"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Digite sua senha *"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Por favor, digite sua senha',
          ]"
        />

        <q-toggle v-model="accept" label="Aceito os termos de uso" />

        <div>
          <q-btn label="Cadastrar" type="submit" color="primary" />
          <q-btn
            label="Limpar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const birthday = ref(null);
    const email = ref(null);
    const gender = ref(null);
    const relationshipStatus = ref(null);
    const password = ref(null);
    const accept = ref(false);

    const minimumYear = new Date().getFullYear() - 18;

    return {
      minimumYear,

      name,
      birthday,
      email,
      gender,
      password,
      accept,
      relationshipStatus,

      genderOptions: [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
      ],
      relationshipStatuses: [
        { label: 'Solteiro(a)', value: 'single' },
        { label: 'Namorando', value: 'in_a_relationship' },
        { label: 'Casado(a)', value: 'married' },
        { label: 'Viúvo(a)', value: 'widower' },
      ],

      async onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first',
          });
        } else {
          const genderObj = gender?.value as unknown as {
            label?: string;
            value?: string;
          };
          const relationshipStatusObj = relationshipStatus.value as unknown as {
            label?: string;
            value?: string;
          };
          const relationshipStatusWidow =
            genderObj.value === 'male' ? 'widow' : 'widower';

          const nameValue = name?.value as unknown as string;
          const nameSplitted = nameValue.split(' ');

          const firstName = nameSplitted[0];
          const lastName = nameSplitted.slice(1).join();
          const birthdayValue = birthday.value;
          const genderValue = genderObj.value;
          const passwordValue = password.value;
          const relationshipStatusValue =
            relationshipStatusObj.value === 'widower'
              ? relationshipStatusWidow
              : relationshipStatusObj.value;

          await api.post('/user/', {
            email: email.value,
            firstName,
            lastName,
            birthday: birthdayValue,
            gender: genderValue,
            password: passwordValue,
            relationshipStatus: relationshipStatusValue,
          });

          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Cadastro realizado com sucesso! Redirecionando...',
          });
        }
      },

      onReset() {
        name.value = null;
        birthday.value = null;
        accept.value = false;
      },
    };
  },
});
</script>
