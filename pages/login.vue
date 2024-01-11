<script setup lang="ts">
import type { ResponseUser } from "~/data/interfaces";


const login = ref<boolean>(true);
const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const retypePassword = ref<string>("");

const useUser = useUserStore();

const loginHandler = async () => {
  const loginData = { email: email.value, password: password.value };
  const { data }: { data: ResponseUser } = await $fetch("/api/login", {
    method: "post",
    body: loginData
  });

  if (data.success) {
    useUser.setUser(data.data)
    clearFields();
    await navigateTo('/')
  }
};

const registerHandler = async () => {

  const loginData = { email: email.value, password: password.value, retypePassword: retypePassword.value, username: username.value };

  const { data }: { data: ResponseUser } = await $fetch("/api/register", {
    method: "post",
    body: loginData
  });

  if (data.success) {
    clearFields();
    changeLogin()
  }
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

      <BaseInput v-if="!login" :name="username" @onChange="(v) => (username = v)" placeholder="Vardas"
        label="Vartotojo vardas" />

      <BaseInput :name="email" @onChange="(v) => (email = v)" placeholder="pavyzdys@gmail.com"
        label="Elektroninis paštas" />

      <BaseInput :name="password" @onChange="(v) => (password = v)" placeholder="Slaptažodis" label="Slaptažodis"
        type="password" />
      <BaseInput :name="retypePassword" @onChange="(v) => (retypePassword = v)" v-if="!login" placeholder="Slaptažodis"
        label="Slaptažodio patvirtinimas" type="password" />

      <BaseButton v-if="login" name="login" @click="loginHandler" />
      <BaseButton v-else name="register" @click="registerHandler" />

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
