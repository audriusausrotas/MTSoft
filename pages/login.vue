<script setup lang="js">
import useError from "~/composables/useError"

const login = ref(true);
const username = ref("");
const email = ref("");
const password = ref("");
const retypePassword = ref("");

const useUser = useUserStore();
const {setError, message, isError} = useError()

const loginHandler = async () => {

  if (!email.value || !password.value || !email.value.includes("@")) return setError("užpildykite visus laukus", true);

  const loginData = { email: email.value, password: password.value };

  const { data } = await useFetch("/api/login", {
    method: "post",
    body: loginData
  });

  if (data.value.success) {
    useUser.setUser(data.value.data)
    clearFields();
    await navigateTo('/')
  } else {
    setError(data.value.message, true)
  }
};

const registerHandler = async () => {

  if (!email.value || !password.value || !email.value.includes("@") || !username.value || !retypePassword.value)  return setError("užpildykite visus laukus", true);
  if (password.value !== retypePassword.value)  return setError("Slaptažodžiai nesutampa", true);

  const loginData = { email: email.value, password: password.value, retypePassword:retypePassword.value, username: username.value };

  const { data } = await useFetch("/api/register", {
    method: "post",
    body: loginData
  });

  if (data.value.success) {
    clearFields();
    changeLogin()
    setError("registracija sėkminga", false);
  } else {
     setError(data.value.message, true);
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
console.log(useUser.user)
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

      <BaseButton v-if="login" name="login" @click="loginHandler" />
      <BaseButton v-else name="register" @click="registerHandler" />

      <p v-if="login" class="self-center mt-4">
        Dar neturi paskyros?
        <span class="text-blue-500 hover:cursor-pointer" @click="changeLogin"
          >Registruokis</span
        >
      </p>

      <p v-else class="self-center mt-4">
        Turi paskyrą?
        <span class="text-blue-500 hover:cursor-pointer" @click="changeLogin"
          >Prisijunk</span
        >
      </p>

      <Error :message="message" :isError="isError" />
    </div>
  </div>
</template>

<style scoped></style>
