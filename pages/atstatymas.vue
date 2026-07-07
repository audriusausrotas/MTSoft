<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { setError, setSuccess } = useCustomError();
const isLoading = ref<boolean>(false);

const stage = ref(1);
const email = ref("");
const input = ref("");

const resetHandler = async () => {
  if (!email.value) {
    setError("Visi laukai yra privalomi");
    return;
  }

  isLoading.value = true;

  const response = await request.post("resetPassword", { email: email.value });

  if (response.success) {
    stage.value = 2;
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
  isLoading.value = false;
};

const loginHandler = async () => {
  if (!email.value || !input.value) {
    setError("Visi laukai yra privalomi");
    return;
  }

  isLoading.value = true;

  const response = await request.post("loginWithoutPassword", {
    email: email.value,
    code: input.value,
  });

  if (response.success) {
    setSuccess(response.message);
    email.value = "";
    input.value = "";
    navigateTo("/profilis");
  } else {
    setError(response.message);
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="flex flex-col items-center gap-4 mt-40 text-primary-gold">
    <div v-if="stage === 1" class="text-2xl">Įveskite savo elektroninį paštą</div>
    <div v-if="stage === 2" class="text-2xl">Įveskite patvirtinimo kodą</div>

    <BaseInput
      v-if="stage === 1"
      :name="email"
      @onChange="(v) => (email = v)"
      placeholder="pavyzdys@gmail.com"
      label="Elektroninis paštas"
      @keyup.enter="resetHandler"
      :isLoading="isLoading"
    />
    <div class="text-primary-white border-b border-primary-gray-light">
      <input v-if="stage === 2" type="number" v-model="input" />
    </div>

    <BaseButton
      v-if="stage === 1"
      name="Atstatyti slaptažodį"
      @click="resetHandler"
      :isLoading="isLoading"
    />

    <BaseButton
      v-if="stage === 2"
      name="Prisijungti su kodu"
      @click="loginHandler"
      :isLoading="isLoading"
    />
  </div>
</template>

<style scoped></style>
