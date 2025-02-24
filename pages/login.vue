<script setup lang="ts">
import type { ResponseUser } from "~/data/interfaces";

definePageMeta({
  layout: false,
});

const { setError, setIsError } = useError();
const login = ref<boolean>(true);
const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const retypePassword = ref<string>("");
const isLoading = ref<boolean>(false);
const useUser = useUserStore();

const loginHandler = async () => {
  isLoading.value = true;
  const loginData = { email: email.value, password: password.value };
  const data: ResponseUser = await $fetch("/api/login", {
    method: "post",
    body: loginData,
  });
  if (data.success) {
    useUser.setUser(data.data);
    clearFields();
    setIsError(false);
    setError(data.message);
    await navigateTo("/");
  } else {
    setError(data.message);
  }
  isLoading.value = false;
};

const registerHandler = async () => {
  isLoading.value = true;
  const loginData = {
    email: email.value,
    password: password.value,
    retypePassword: retypePassword.value,
    username: username.value,
  };

  const data: { success: boolean; data: ResponseUser; message: string } = await $fetch(
    "/api/register",
    {
      method: "post",
      body: loginData,
    }
  );

  if (data.success) {
    setIsError(false);
    setError(data.message);
    clearFields();
    changeLogin();
  } else {
    setError(data.message);
  }
  isLoading.value = false;
};

const changeLogin = () => {
  clearFields();
  login.value = !login.value;
};

const clearFields = () => {
  email.value = "";
  password.value = "";
  retypePassword.value = "";
  username.value = "";
};
</script>

<template>
  <div class="flex items-center justify-center pt-20 m-auto">
    <div class="flex flex-col items-center gap-4">
      <h3 v-if="login" class="text-2xl">Prisijungti</h3>
      <h3 v-else class="text-2xl">Registruotis</h3>

      <BaseInput
        v-if="!login"
        :name="username"
        @onChange="(v) => (username = v)"
        placeholder="Vardas"
        label="Vartotojo vardas"
      />

      <BaseInput
        :name="email"
        @onChange="(v) => (email = v)"
        placeholder="pavyzdys@gmail.com"
        label="Elektroninis paštas"
      />

      <BaseInput
        :name="password"
        @onChange="(v) => (password = v)"
        placeholder="Slaptažodis"
        label="Slaptažodis"
        type="password"
      />
      <BaseInput
        :name="retypePassword"
        @onChange="(v) => (retypePassword = v)"
        v-if="!login"
        placeholder="Slaptažodis"
        label="Slaptažodio patvirtinimas"
        type="password"
      />

      <BaseButton v-if="login" name="login" @click="loginHandler" :isLoading="isLoading" />
      <BaseButton v-else name="register" @click="registerHandler" :isLoading="isLoading" />

      <p v-if="login" class="self-center mt-4">
        Dar neturi paskyros?
        <span class="text-blue-500 hover:cursor-pointer" @click="changeLogin">Registruokis</span>
      </p>

      <p v-else class="self-center mt-4">
        Turi paskyrą?
        <span class="text-blue-500 hover:cursor-pointer" @click="changeLogin">Prisijunk</span>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
