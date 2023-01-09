<template>
  <div class="row justify-center">Ola Mundo</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useUserStore } from 'stores/user';

export default defineComponent({
  name: 'UserPage',
  components: {},
  setup() {
    return {};
  },
});
</script>
